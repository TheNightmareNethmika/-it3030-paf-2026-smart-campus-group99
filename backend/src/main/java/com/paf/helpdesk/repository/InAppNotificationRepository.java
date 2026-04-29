package com.paf.helpdesk.repository;

import com.paf.helpdesk.entity.InAppNotification;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface InAppNotificationRepository extends JpaRepository<InAppNotification, Long> {

    @Query("SELECT n FROM InAppNotification n WHERE LOWER(n.recipientEmail) = LOWER(:email) ORDER BY n.createdAt DESC")
    Slice<InAppNotification> findForRecipientNewestFirst(@Param("email") String email, Pageable pageable);

    @Query("SELECT COUNT(n) FROM InAppNotification n WHERE LOWER(n.recipientEmail) = LOWER(:email) AND n.readFlag = false")
    long countUnreadForRecipient(@Param("email") String email);

    @Query("SELECT n FROM InAppNotification n WHERE n.id = :id AND LOWER(n.recipientEmail) = LOWER(:email)")
    Optional<InAppNotification> findByIdForRecipient(@Param("id") Long id, @Param("email") String email);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE InAppNotification n SET n.readFlag = true WHERE LOWER(n.recipientEmail) = LOWER(:email) AND n.readFlag = false")
    int markAllReadForRecipient(@Param("email") String email);
}
