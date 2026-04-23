package com.paf.helpdesk.service.impl;

import com.paf.helpdesk.dto.BookingDecisionDto;
import com.paf.helpdesk.dto.BookingRequestDto;
import com.paf.helpdesk.dto.BookingResponseDto;
import com.paf.helpdesk.dto.BookingUpdateDto;
import com.paf.helpdesk.entity.Booking;
import com.paf.helpdesk.entity.BookingStatus;
import com.paf.helpdesk.exception.BookingConflictException;
import com.paf.helpdesk.exception.InvalidBookingStateException;
import com.paf.helpdesk.exception.ResourceNotFoundException;
import com.paf.helpdesk.repository.BookingRepository;
import com.paf.helpdesk.service.BookingService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    public BookingServiceImpl(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Override
    public BookingResponseDto createBooking(BookingRequestDto requestDto) {
        validateTimeRange(requestDto.getStartTime().toString(), requestDto.getEndTime().toString());

        boolean conflictExists = bookingRepository
                .existsByResourceIdAndBookingDateAndStatusInAndStartTimeLessThanAndEndTimeGreaterThan(
                        requestDto.getResourceId(),
                        requestDto.getBookingDate(),
                        Arrays.asList(BookingStatus.PENDING, BookingStatus.APPROVED),
                        requestDto.getEndTime(),
                        requestDto.getStartTime()
                );

        if (conflictExists) {
            throw new BookingConflictException("Selected time slot is already booked for this resource");
        }

        Booking booking = new Booking();
        booking.setResourceId(requestDto.getResourceId());
        booking.setUserId(1L); // temporary logged-in user id
        booking.setBookingDate(requestDto.getBookingDate());
        booking.setStartTime(requestDto.getStartTime());
        booking.setEndTime(requestDto.getEndTime());
        booking.setPurpose(requestDto.getPurpose());
        booking.setExpectedAttendees(requestDto.getExpectedAttendees());
        booking.setStatus(BookingStatus.PENDING);

        Booking savedBooking = bookingRepository.save(booking);
        return mapToResponse(savedBooking);
    }

    @Override
    public List<BookingResponseDto> getMyBookings(Long userId) {
        return bookingRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingResponseDto> getAllBookings(BookingStatus status, Long resourceId, LocalDate bookingDate) {
        List<Booking> bookings;

        if (status != null) {
            bookings = bookingRepository.findByStatus(status);
        } else if (resourceId != null) {
            bookings = bookingRepository.findByResourceId(resourceId);
        } else if (bookingDate != null) {
            bookings = bookingRepository.findByBookingDate(bookingDate);
        } else {
            bookings = bookingRepository.findAll();
        }

        return bookings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BookingResponseDto getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        return mapToResponse(booking);
    }

    @Override
    public BookingResponseDto updateBooking(Long bookingId, Long userId, BookingUpdateDto updateDto) {
        Booking booking = bookingRepository.findByIdAndUserId(bookingId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found or does not belong to user"));

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new InvalidBookingStateException("Only pending bookings can be updated");
        }

        validateTimeRange(updateDto.getStartTime().toString(), updateDto.getEndTime().toString());

        boolean conflictExists = bookingRepository
                .existsByResourceIdAndBookingDateAndStatusInAndStartTimeLessThanAndEndTimeGreaterThan(
                        booking.getResourceId(),
                        updateDto.getBookingDate(),
                        Arrays.asList(BookingStatus.PENDING, BookingStatus.APPROVED),
                        updateDto.getEndTime(),
                        updateDto.getStartTime()
                );

        boolean sameTimeAsCurrent =
                booking.getBookingDate().equals(updateDto.getBookingDate()) &&
                booking.getStartTime().equals(updateDto.getStartTime()) &&
                booking.getEndTime().equals(updateDto.getEndTime());

        if (conflictExists && !sameTimeAsCurrent) {
            throw new BookingConflictException("Updated time slot is already booked for this resource");
        }

        booking.setBookingDate(updateDto.getBookingDate());
        booking.setStartTime(updateDto.getStartTime());
        booking.setEndTime(updateDto.getEndTime());
        booking.setPurpose(updateDto.getPurpose());
        booking.setExpectedAttendees(updateDto.getExpectedAttendees());

        Booking updatedBooking = bookingRepository.save(booking);
        return mapToResponse(updatedBooking);
    }

    @Override
    public BookingResponseDto decideBooking(Long bookingId, BookingDecisionDto decisionDto) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new InvalidBookingStateException("Only pending bookings can be approved or rejected");
        }

        String decision = decisionDto.getStatus().trim().toUpperCase();

        if ("APPROVED".equals(decision)) {
            boolean conflictExists = bookingRepository
                    .existsByResourceIdAndBookingDateAndStatusInAndStartTimeLessThanAndEndTimeGreaterThan(
                            booking.getResourceId(),
                            booking.getBookingDate(),
                            List.of(BookingStatus.APPROVED),
                            booking.getEndTime(),
                            booking.getStartTime()
                    );

            if (conflictExists) {
                throw new BookingConflictException("Cannot approve booking because the time slot is already occupied");
            }

            booking.setStatus(BookingStatus.APPROVED);
            booking.setAdminReason(decisionDto.getReason());
        } else if ("REJECTED".equals(decision)) {
            booking.setStatus(BookingStatus.REJECTED);
            booking.setAdminReason(decisionDto.getReason());
        } else {
            throw new InvalidBookingStateException("Decision status must be either APPROVED or REJECTED");
        }

        Booking savedBooking = bookingRepository.save(booking);
        return mapToResponse(savedBooking);
    }

    @Override
    public BookingResponseDto cancelBooking(Long bookingId, Long userId) {
        Booking booking = bookingRepository.findByIdAndUserId(bookingId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found or does not belong to user"));

        if (booking.getStatus() != BookingStatus.APPROVED) {
            throw new InvalidBookingStateException("Only approved bookings can be cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        Booking cancelledBooking = bookingRepository.save(booking);

        return mapToResponse(cancelledBooking);
    }

    @Override
    public void deleteBooking(Long bookingId, Long userId, boolean isAdmin) {
        Booking booking;

        if (isAdmin) {
            booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));
        } else {
            booking = bookingRepository.findByIdAndUserId(bookingId, userId)
                    .orElseThrow(() -> new ResourceNotFoundException("Booking not found or does not belong to user"));

            if (booking.getStatus() != BookingStatus.PENDING) {
                throw new InvalidBookingStateException("Only pending bookings can be deleted by the user.");
            }
        }

        bookingRepository.delete(booking);
    }

    private BookingResponseDto mapToResponse(Booking booking) {
        BookingResponseDto dto = new BookingResponseDto();
        dto.setId(booking.getId());
        dto.setResourceId(booking.getResourceId());
        dto.setUserId(booking.getUserId());
        dto.setBookingDate(booking.getBookingDate());
        dto.setStartTime(booking.getStartTime());
        dto.setEndTime(booking.getEndTime());
        dto.setPurpose(booking.getPurpose());
        dto.setExpectedAttendees(booking.getExpectedAttendees());
        dto.setStatus(booking.getStatus());
        dto.setAdminReason(booking.getAdminReason());
        dto.setCreatedAt(booking.getCreatedAt());
        dto.setUpdatedAt(booking.getUpdatedAt());
        return dto;
    }

    private void validateTimeRange(String startTime, String endTime) {
        if (startTime.compareTo(endTime) >= 0) {
            throw new InvalidBookingStateException("Start time must be earlier than end time");
        }
    }
}