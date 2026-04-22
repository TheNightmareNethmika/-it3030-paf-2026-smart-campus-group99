package com.paf.helpdesk.controller;

import com.paf.helpdesk.dto.*;
import com.paf.helpdesk.entity.BookingStatus;
import com.paf.helpdesk.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // CREATE BOOKING
    @PostMapping
    public BookingResponseDto createBooking(@Valid @RequestBody BookingRequestDto requestDto) {
        return bookingService.createBooking(requestDto);
    }

    // GET MY BOOKINGS
    @GetMapping("/my")
    public List<BookingResponseDto> getMyBookings() {
        return bookingService.getMyBookings(1L); // temporary user
    }

    // GET ALL BOOKINGS (ADMIN)
    @GetMapping
    public List<BookingResponseDto> getAllBookings(
            @RequestParam(required = false) BookingStatus status,
            @RequestParam(required = false) Long resourceId,
            @RequestParam(required = false) LocalDate bookingDate
    ) {
        return bookingService.getAllBookings(status, resourceId, bookingDate);
    }

    // GET SINGLE BOOKING
    @GetMapping("/{id}")
    public BookingResponseDto getBooking(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    // UPDATE BOOKING (only PENDING)
    @PutMapping("/{id}")
    public BookingResponseDto updateBooking(
            @PathVariable Long id,
            @Valid @RequestBody BookingUpdateDto updateDto
    ) {
        return bookingService.updateBooking(id, 1L, updateDto);
    }

    // APPROVE / REJECT
    @PatchMapping("/{id}/decision")
    public BookingResponseDto decideBooking(
            @PathVariable Long id,
            @Valid @RequestBody BookingDecisionDto decisionDto
    ) {
        return bookingService.decideBooking(id, decisionDto);
    }

    // CANCEL BOOKING
    @PatchMapping("/{id}/cancel")
    public BookingResponseDto cancelBooking(@PathVariable Long id) {
        return bookingService.cancelBooking(id, 1L);
    }

    // DELETE BOOKING
    @DeleteMapping("/{id}")
    public String deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id, 1L, false);
        return "Booking deleted successfully";
    }
}