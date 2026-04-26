package com.paf.helpdesk.dto;

import com.paf.helpdesk.entity.InAppNotification;
import com.paf.helpdesk.entity.NotificationType;

import java.time.LocalDateTime;

public class InAppNotificationResponse {

    private Long id;
    private NotificationType type;
    private String title;
    private String message;
    private Long issueId;
    private Long bookingId;
    private boolean read;
    private LocalDateTime createdAt;

    public static InAppNotificationResponse from(InAppNotification n) {
        InAppNotificationResponse r = new InAppNotificationResponse();
        r.setId(n.getId());
        r.setType(n.getType());
        r.setTitle(n.getTitle());
        r.setMessage(n.getMessage());
        r.setIssueId(n.getIssueId());
        r.setBookingId(n.getBookingId());
        r.setRead(n.isReadFlag());
        r.setCreatedAt(n.getCreatedAt());
        return r;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getIssueId() {
        return issueId;
    }

    public void setIssueId(Long issueId) {
        this.issueId = issueId;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
