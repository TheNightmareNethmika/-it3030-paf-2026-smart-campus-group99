package com.paf.helpdesk.repository;

import com.paf.helpdesk.entity.BookingStatus;
import com.paf.helpdesk.entity.ResourceBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ResourceBookingRepository extends JpaRepository<ResourceBooking, Long> {

    @Query("SELECT b FROM ResourceBooking b JOIN FETCH b.resource WHERE b.id = :id")
    Optional<ResourceBooking> findByIdWithResource(@Param("id") long id);

    @Query("SELECT b FROM ResourceBooking b JOIN FETCH b.resource WHERE " +
            "LOWER(b.requesterEmail) = LOWER(:email) ORDER BY b.startAt DESC")
    List<ResourceBooking> findByRequesterEmailOrderByStartAtDesc(@Param("email") String email);

    @Query("SELECT b FROM ResourceBooking b JOIN FETCH b.resource ORDER BY b.createdAt DESC")
    List<ResourceBooking> findAllWithResource();

    @Query("SELECT b FROM ResourceBooking b JOIN FETCH b.resource WHERE b.status = :status ORDER BY b.createdAt DESC")
    List<ResourceBooking> findByStatusWithResource(@Param("status") BookingStatus status);

    @Query("SELECT COUNT(b) FROM ResourceBooking b WHERE b.resource.id = :resourceId " +
            "AND b.status IN :activeStatuses " +
            "AND (:excludeId IS NULL OR b.id <> :excludeId) " +
            "AND b.startAt < :endAt AND b.endAt > :startAt")
    long countOverlap(
            @Param("resourceId") long resourceId,
            @Param("startAt") LocalDateTime startAt,
            @Param("endAt") LocalDateTime endAt,
            @Param("excludeId") Long excludeId,
            @Param("activeStatuses") java.util.List<BookingStatus> activeStatuses
    );
}
