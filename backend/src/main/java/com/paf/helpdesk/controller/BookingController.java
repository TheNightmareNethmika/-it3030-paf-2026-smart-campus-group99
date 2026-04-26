package com.paf.helpdesk.controller;

import com.paf.helpdesk.dto.BookingResponse;
import com.paf.helpdesk.dto.CreateBookingRequest;
import com.paf.helpdesk.service.BookingService;
import com.uniflow.system.model.User;
import com.uniflow.system.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;
    private final UserRepository userRepository;

    public BookingController(BookingService bookingService, UserRepository userRepository) {
        this.bookingService = bookingService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public BookingResponse create(@Valid @RequestBody CreateBookingRequest request, Authentication authentication) {
        String email = authentication.getName();
        String name = userRepository.findByEmailIgnoreCase(email)
                .map(User::getName)
                .filter(n -> n != null && !n.isBlank())
                .orElseGet(() -> {
                    int at = email.indexOf('@');
                    return at > 0 ? email.substring(0, at) : email;
                });
        return bookingService.create(request, email, name);
    }

    @GetMapping("/mine")
    public List<BookingResponse> myBookings(Authentication authentication) {
        return bookingService.myBookings(authentication.getName());
    }
}
