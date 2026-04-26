package com.paf.helpdesk.service;

import com.paf.helpdesk.dto.InAppNotificationResponse;
import com.paf.helpdesk.entity.InAppNotification;
import com.paf.helpdesk.entity.Issue;
import com.paf.helpdesk.entity.NotificationType;
import com.paf.helpdesk.entity.ResourceBooking;
import com.paf.helpdesk.repository.InAppNotificationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
public class InAppNotificationService {

    private static final int TITLE_MAX = 200;
    private static final int MSG_MAX = 2000;

    private final InAppNotificationRepository notificationRepository;

    public InAppNotificationService(InAppNotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Transactional
    public void onAdminWorkflowStatusChange(Issue issue, String oldStatus, String newStatus, String actorEmail) {
        String o = nullToDash(oldStatus);
        String n = nullToDash(newStatus);
        String title = "Workflow status updated";
        String message = String.format("Issue #%d: workflow is now %s (was %s). %s", issue.getId(), n, o, shortTitle(issue.getTitle()));
        deliver(issue.getId(), null, title, message, NotificationType.ISSUE_STATUS, actorEmail,
                issue.getReporterEmail(), issue.getAssignedTechnicianEmail());
    }

    @Transactional
    public void onTechnicianProgressChange(Issue issue, String oldTechnicianStatus, String newTechnicianStatus, String actorEmail) {
        String o = nullToDash(oldTechnicianStatus);
        String n = nullToDash(newTechnicianStatus);
        String title = "Technician progress updated";
        String message = String.format("Issue #%d: on-site status is now %s (was %s). %s", issue.getId(), n, o, shortTitle(issue.getTitle()));
        deliver(issue.getId(), null, title, message, NotificationType.ISSUE_STATUS, actorEmail,
                issue.getReporterEmail());
    }

    @Transactional
    public void onAssignTechnician(Issue issue, String newTechnicianEmail, String actorEmail) {
        String techName = nullToDash(issue.getAssignedTechnicianName());
        String title = "Assignment updated";
        String messageReporter = String.format("Issue #%d was assigned to %s. %s", issue.getId(), techName, shortTitle(issue.getTitle()));
        deliver(issue.getId(), null, title, messageReporter, NotificationType.ISSUE_STATUS, actorEmail, issue.getReporterEmail());

        String messageTech = String.format("You were assigned to issue #%d. %s", issue.getId(), shortTitle(issue.getTitle()));
        deliver(issue.getId(), null, title, messageTech, NotificationType.ISSUE_STATUS, actorEmail, newTechnicianEmail);
    }

    @Transactional
    public void onUnassignTechnician(Issue issue, String actorEmail) {
        String title = "Assignment removed";
        String message = String.format("The technician was unassigned from issue #%d. %s", issue.getId(), shortTitle(issue.getTitle()));
        deliver(issue.getId(), null, title, message, NotificationType.ISSUE_STATUS, actorEmail, issue.getReporterEmail());
    }

    @Transactional
    public void onCommentFromReporter(Issue issue, String reporterEmail) {
        String title = "New comment on your issue";
        String message = String.format("The reporter added a comment on issue #%d. %s", issue.getId(), shortTitle(issue.getTitle()));
        deliver(issue.getId(), null, title, message, NotificationType.ISSUE_COMMENT, reporterEmail,
                issue.getAssignedTechnicianEmail());
    }

    @Transactional
    public void onCommentFromTechnician(Issue issue, String technicianAuthorEmail) {
        String title = "New comment on your report";
        String message = String.format("A technician commented on issue #%d. %s", issue.getId(), shortTitle(issue.getTitle()));
        deliver(issue.getId(), null, title, message, NotificationType.ISSUE_COMMENT, technicianAuthorEmail,
                issue.getReporterEmail());
    }

    @Transactional
    public void onCommentFromAdmin(Issue issue, String actorEmail) {
        String title = "New comment from support";
        String message = String.format("Admin added a comment on issue #%d. %s", issue.getId(), shortTitle(issue.getTitle()));
        deliver(issue.getId(), null, title, message, NotificationType.ISSUE_COMMENT, actorEmail,
                issue.getReporterEmail(), issue.getAssignedTechnicianEmail());
    }

    /**
     * Notifies all campus admins that a new booking request was submitted (skips the requester if they are also an admin).
     */
    @Transactional
    public void onNewBookingRequestForAdmins(ResourceBooking booking, java.util.List<String> adminEmails, String requesterEmail) {
        String res = booking.getResource().getName();
        String title = "New booking request";
        String message = String.format("Booking #%d: %s at %s — %s to %s. Requester: %s",
                booking.getId(), res, booking.getResource().getLocation(),
                booking.getStartAt(), booking.getEndAt(), nullToDash(requesterEmail));
        String req = norm(requesterEmail);
        for (String raw : adminEmails) {
            if (raw == null || raw.isBlank()) {
                continue;
            }
            String email = raw.trim();
            if (req != null && req.equalsIgnoreCase(email)) {
                continue;
            }
            saveOne(null, booking.getId(), title, message, NotificationType.ISSUE_STATUS, email);
        }
    }

    @Transactional
    public void onBookingApprovedForRequester(ResourceBooking booking) {
        String title = "Booking approved";
        String message = String.format("Your booking #%d for \"%s\" was approved. %s – %s.",
                booking.getId(), booking.getResource().getName(), booking.getStartAt(), booking.getEndAt());
        saveOne(null, booking.getId(), title, message, NotificationType.ISSUE_STATUS, booking.getRequesterEmail());
    }

    @Transactional
    public void onBookingSubmittedForRequester(ResourceBooking booking) {
        String title = "Booking request received";
        String message = String.format("We received your request #%d for \"%s\" (%s – %s). Awaiting admin approval.",
                booking.getId(), booking.getResource().getName(), booking.getStartAt(), booking.getEndAt());
        saveOne(null, booking.getId(), title, message, NotificationType.ISSUE_STATUS, booking.getRequesterEmail());
    }

    @Transactional
    public void onBookingRejectedForRequester(ResourceBooking booking) {
        String title = "Booking rejected";
        String note = booking.getAdminNote() == null || booking.getAdminNote().isBlank()
                ? ""
                : " Note: " + clamp(booking.getAdminNote(), 400);
        String message = String.format("Your booking #%d for \"%s\" was rejected.%s",
                booking.getId(), booking.getResource().getName(), note);
        saveOne(null, booking.getId(), title, message, NotificationType.ISSUE_STATUS, booking.getRequesterEmail());
    }

    private void deliver(Long issueId, Long bookingId, String title, String message, NotificationType type, String actorEmail, String... recipients) {
        String actor = norm(actorEmail);
        for (String raw : recipients) {
            if (raw == null || raw.isBlank()) {
                continue;
            }
            String email = raw.trim();
            if (actor != null && actor.equalsIgnoreCase(email)) {
                continue;
            }
            saveOne(issueId, bookingId, title, message, type, email);
        }
    }

    private void saveOne(Long issueId, Long bookingId, String title, String message, NotificationType type, String recipientEmail) {
        InAppNotification n = new InAppNotification();
        n.setRecipientEmail(recipientEmail.trim());
        n.setType(type);
        n.setTitle(clamp(title, TITLE_MAX));
        n.setMessage(clamp(message, MSG_MAX));
        n.setIssueId(issueId);
        n.setBookingId(bookingId);
        n.setReadFlag(false);
        n.setCreatedAt(LocalDateTime.now());
        notificationRepository.save(n);
    }

    private static String nullToDash(String s) {
        if (s == null || s.isBlank()) {
            return "—";
        }
        return s.trim();
    }

    private static String shortTitle(String title) {
        if (title == null || title.isBlank()) {
            return "";
        }
        String t = title.trim();
        if (t.length() > 80) {
            return "\"" + t.substring(0, 77) + "…\"";
        }
        return "\"" + t + "\"";
    }

    private static String clamp(String s, int max) {
        if (s == null) {
            return "";
        }
        if (s.length() <= max) {
            return s;
        }
        return s.substring(0, max - 1) + "…";
    }

    private static String norm(String email) {
        if (email == null) {
            return null;
        }
        String t = email.trim();
        return t.isEmpty() ? null : t;
    }

    @Transactional
    public InAppNotificationResponse markAsReadForRecipient(long id, String recipientEmail) {
        InAppNotification n = notificationRepository
                .findByIdForRecipient(id, recipientEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Notification not found"));
        n.setReadFlag(true);
        notificationRepository.save(n);
        return InAppNotificationResponse.from(n);
    }

    @Transactional
    public int markAllReadForRecipient(String recipientEmail) {
        return notificationRepository.markAllReadForRecipient(recipientEmail);
    }
}
