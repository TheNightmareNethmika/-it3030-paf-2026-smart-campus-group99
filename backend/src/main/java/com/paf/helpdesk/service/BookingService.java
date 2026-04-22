package com.paf.helpdesk.service;

import com.paf.helpdesk.dto.BookingDecisionDto;
import com.paf.helpdesk.dto.BookingRequestDto;
import com.paf.helpdesk.dto.BookingResponseDto;
import com.paf.helpdesk.dto.BookingUpdateDto;
import com.paf.helpdesk.entity.BookingStatus;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {

    BookingResponseDto createBooking(BookingRequestDto requestDto);

    List<BookingResponseDto> getMyBookings(Long userId);

    List<BookingResponseDto> getAllBookings(BookingStatus status, Long resourceId, LocalDate bookingDate);

    BookingResponseDto getBookingById(Long bookingId);

    BookingResponseDto updateBooking(Long bookingId, Long userId, BookingUpdateDto updateDto);

    BookingResponseDto decideBooking(Long bookingId, BookingDecisionDto decisionDto);

    BookingResponseDto cancelBooking(Long bookingId, Long userId);

    void deleteBooking(Long bookingId, Long userId, boolean isAdmin);
}