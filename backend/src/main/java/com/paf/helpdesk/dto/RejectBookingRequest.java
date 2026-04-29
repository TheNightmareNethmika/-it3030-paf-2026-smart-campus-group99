package com.paf.helpdesk.dto;

import jakarta.validation.constraints.Size;

public class RejectBookingRequest {

    @Size(max = 2000)
    private String note;

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
