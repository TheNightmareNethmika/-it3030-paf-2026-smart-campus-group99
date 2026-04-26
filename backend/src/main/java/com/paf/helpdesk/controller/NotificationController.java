package com.paf.helpdesk.controller;

import com.paf.helpdesk.dto.InAppNotificationResponse;
import com.paf.helpdesk.repository.InAppNotificationRepository;
import com.paf.helpdesk.service.InAppNotificationService;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    private static final int PAGE_SIZE = 50;

    private final InAppNotificationRepository notificationRepository;
    private final InAppNotificationService inAppNotificationService;

    public NotificationController(InAppNotificationRepository notificationRepository,
                                  InAppNotificationService inAppNotificationService) {
        this.notificationRepository = notificationRepository;
        this.inAppNotificationService = inAppNotificationService;
    }

    @GetMapping
    public List<InAppNotificationResponse> list(Authentication authentication) {
        String email = authentication.getName();
        return notificationRepository
                .findForRecipientNewestFirst(email, PageRequest.of(0, PAGE_SIZE))
                .getContent()
                .stream()
                .map(InAppNotificationResponse::from)
                .toList();
    }

    @GetMapping("/unread-count")
    public Map<String, Long> unreadCount(Authentication authentication) {
        long count = notificationRepository.countUnreadForRecipient(authentication.getName());
        return Map.of("unreadCount", count);
    }

    @PatchMapping("/{id}/read")
    public InAppNotificationResponse markRead(@PathVariable Long id, Authentication authentication) {
        return inAppNotificationService.markAsReadForRecipient(id, authentication.getName());
    }

    @PostMapping("/read-all")
    public ResponseEntity<Map<String, Integer>> markAllRead(Authentication authentication) {
        int updated = inAppNotificationService.markAllReadForRecipient(authentication.getName());
        return ResponseEntity.ok(Map.of("updated", updated));
    }
}
