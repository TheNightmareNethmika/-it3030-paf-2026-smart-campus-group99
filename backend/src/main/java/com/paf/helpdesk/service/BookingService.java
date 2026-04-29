package com.paf.helpdesk.service;

import com.paf.helpdesk.dto.BookingResponse;
import com.paf.helpdesk.dto.CreateBookingRequest;
import com.paf.helpdesk.entity.BookingStatus;
import com.paf.helpdesk.entity.Resource;
import com.paf.helpdesk.entity.ResourceBooking;
import com.paf.helpdesk.entity.ResourceStatus;
import com.paf.helpdesk.repository.ResourceBookingRepository;
import com.paf.helpdesk.repository.ResourceRepository;
import com.uniflow.system.model.Role;
import com.uniflow.system.model.User;
import com.uniflow.system.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingService {

    private static final java.util.List<BookingStatus> ACTIVE = java.util.List.of(
            BookingStatus.PENDING, BookingStatus.APPROVED
    );

    private final ResourceBookingRepository bookingRepository;
    private final ResourceRepository resourceRepository;
    private final InAppNotificationService inAppNotificationService;
    private final UserRepository userRepository;

    public BookingService(ResourceBookingRepository bookingRepository,
                          ResourceRepository resourceRepository,
                          InAppNotificationService inAppNotificationService,
                          UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.resourceRepository = resourceRepository;
        this.inAppNotificationService = inAppNotificationService;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> myBookings(String email) {
        return bookingRepository.findByRequesterEmailOrderByStartAtDesc(email)
                .stream()
                .map(BookingResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> allBookings() {
        return bookingRepository.findAllWithResource()
                .stream()
                .map(BookingResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> allBookingsByStatus(BookingStatus status) {
        if (status == null) {
            return allBookings();
        }
        return bookingRepository.findByStatusWithResource(status)
                .stream()
                .map(BookingResponse::from)
                .toList();
    }

    public BookingResponse create(CreateBookingRequest req, String requesterEmail, String requesterName) {
        Resource resource = resourceRepository.findById(req.getResourceId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found"));
        if (resource.getStatus() != ResourceStatus.WORKING) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resource is not available for booking.");
        }
        LocalTime dayStart = req.getStartAt().toLocalTime();
        LocalTime dayEnd = req.getEndAt().toLocalTime();
        LocalDate d0 = req.getStartAt().toLocalDate();
        if (!d0.equals(req.getEndAt().toLocalDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Booking must start and end on the same day.");
        }
        if (!req.getStartAt().isBefore(req.getEndAt())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "End time must be after start time.");
        }
        if (dayStart.isBefore(resource.getAvailableStartTime()) || dayEnd.isAfter(resource.getAvailableEndTime())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Booking must fall within the resource opening hours ("
                            + resource.getAvailableStartTime() + " – " + resource.getAvailableEndTime() + ").");
        }
        long overlaps = bookingRepository.countOverlap(
                resource.getId(), req.getStartAt(), req.getEndAt(), null, ACTIVE
        );
        if (overlaps > 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This time slot is already requested or approved.");
        }

        ResourceBooking b = new ResourceBooking();
        b.setResource(resource);
        b.setRequesterEmail(requesterEmail);
        b.setRequesterName(requesterName);
        b.setStartAt(req.getStartAt());
        b.setEndAt(req.getEndAt());
        b.setPurpose(req.getPurpose() != null ? req.getPurpose().trim() : null);
        b.setStatus(BookingStatus.PENDING);
        ResourceBooking saved = bookingRepository.save(b);

        List<String> adminEmails = userRepository.findByRole(Role.ADMIN)
                .stream()
                .map(User::getEmail)
                .collect(Collectors.toList());
        inAppNotificationService.onNewBookingRequestForAdmins(saved, adminEmails, requesterEmail);
        inAppNotificationService.onBookingSubmittedForRequester(saved);
        return BookingResponse.from(saved);
    }

    public BookingResponse approve(long bookingId) {
        ResourceBooking b = bookingRepository.findByIdWithResource(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
        if (b.getStatus() != BookingStatus.PENDING) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only pending bookings can be approved.");
        }
        long conflicts = bookingRepository.countOverlap(
                b.getResource().getId(), b.getStartAt(), b.getEndAt(), b.getId(), ACTIVE
        );
        if (conflicts > 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Another booking already uses this time slot.");
        }
        b.setStatus(BookingStatus.APPROVED);
        b.setAdminNote(null);
        bookingRepository.save(b);
        inAppNotificationService.onBookingApprovedForRequester(b);
        return BookingResponse.from(b);
    }

    public BookingResponse reject(long bookingId, String note) {
        ResourceBooking b = bookingRepository.findByIdWithResource(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
        if (b.getStatus() != BookingStatus.PENDING) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only pending bookings can be rejected.");
        }
        b.setStatus(BookingStatus.REJECTED);
        b.setAdminNote(note == null || note.isBlank() ? null : note.trim());
        bookingRepository.save(b);
        inAppNotificationService.onBookingRejectedForRequester(b);
        return BookingResponse.from(b);
    }
}
