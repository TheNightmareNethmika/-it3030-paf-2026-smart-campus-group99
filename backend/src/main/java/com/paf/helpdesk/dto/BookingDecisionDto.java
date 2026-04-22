package com.paf.helpdesk.dto;

import jakarta.validation.constraints.NotBlank;

public class BookingDecisionDto {

    @NotBlank(message = "Decision status is required")
    private String status;

    private String reason;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}