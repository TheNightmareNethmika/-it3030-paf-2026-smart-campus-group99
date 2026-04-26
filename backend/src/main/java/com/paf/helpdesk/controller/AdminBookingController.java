package com.paf.helpdesk.controller;

import com.paf.helpdesk.dto.BookingResponse;
import com.paf.helpdesk.dto.RejectBookingRequest;
import com.paf.helpdesk.entity.BookingStatus;
import com.paf.helpdesk.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/bookings")
@CrossOrigin(origins = "*")
public class AdminBookingController {

    private final BookingService bookingService;

    public AdminBookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public List<BookingResponse> list(@RequestParam(required = false) BookingStatus status) {
        return bookingService.allBookingsByStatus(status);
    }

    @PostMapping("/{id}/approve")
    public BookingResponse approve(@PathVariable("id") long id) {
        return bookingService.approve(id);
    }

    @PostMapping("/{id}/reject")
    public BookingResponse reject(
            @PathVariable("id") long id,
            @Valid @RequestBody(required = false) RejectBookingRequest body) {
        String note = body != null ? body.getNote() : null;
        return bookingService.reject(id, note);
    }
}
