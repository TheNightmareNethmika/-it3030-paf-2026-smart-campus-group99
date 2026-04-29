package com.paf.helpdesk.dto;

import com.paf.helpdesk.entity.BookingStatus;
import com.paf.helpdesk.entity.ResourceBooking;

import java.time.LocalDateTime;

public class BookingResponse {

    private Long id;
    private Long resourceId;
    private String resourceName;
    private String location;
    private String requesterEmail;
    private String requesterName;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private String purpose;
    private BookingStatus status;
    private String adminNote;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BookingResponse from(ResourceBooking b) {
        BookingResponse r = new BookingResponse();
        r.setId(b.getId());
        r.setResourceId(b.getResource().getId());
        r.setResourceName(b.getResource().getName());
        r.setLocation(b.getResource().getLocation());
        r.setRequesterEmail(b.getRequesterEmail());
        r.setRequesterName(b.getRequesterName());
        r.setStartAt(b.getStartAt());
        r.setEndAt(b.getEndAt());
        r.setPurpose(b.getPurpose());
        r.setStatus(b.getStatus());
        r.setAdminNote(b.getAdminNote());
        r.setCreatedAt(b.getCreatedAt());
        r.setUpdatedAt(b.getUpdatedAt());
        return r;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getRequesterEmail() {
        return requesterEmail;
    }

    public void setRequesterEmail(String requesterEmail) {
        this.requesterEmail = requesterEmail;
    }

    public String getRequesterName() {
        return requesterName;
    }

    public void setRequesterName(String requesterName) {
        this.requesterName = requesterName;
    }

    public LocalDateTime getStartAt() {
        return startAt;
    }

    public void setStartAt(LocalDateTime startAt) {
        this.startAt = startAt;
    }

    public LocalDateTime getEndAt() {
        return endAt;
    }

    public void setEndAt(LocalDateTime endAt) {
        this.endAt = endAt;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public String getAdminNote() {
        return adminNote;
    }

    public void setAdminNote(String adminNote) {
        this.adminNote = adminNote;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
