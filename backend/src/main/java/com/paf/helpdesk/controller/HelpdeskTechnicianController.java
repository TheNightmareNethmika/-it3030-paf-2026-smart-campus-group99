package com.paf.helpdesk.controller;

import com.paf.helpdesk.dto.CommentRequest;
import com.paf.helpdesk.dto.IssueResponse;
import com.paf.helpdesk.service.TechnicianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/technician")
@CrossOrigin(origins = "*")
public class HelpdeskTechnicianController {

    @Autowired
    private TechnicianService technicianService;

    @GetMapping("/issues")
    public ResponseEntity<List<IssueResponse>> getTechnicianIssues() {
        return ResponseEntity.ok(technicianService.getTechnicianIssues());
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Long>> getTechnicianSummary() {
        return ResponseEntity.ok(technicianService.getTechnicianSummary());
    }

    @PatchMapping("/issues/{issueId}/status")
    public ResponseEntity<IssueResponse> updateIssueStatus(
            @PathVariable Long issueId,
            @RequestBody Map<String, String> request,
            Authentication authentication) {
        String status = request.get("status");
        return ResponseEntity.ok(technicianService.updateIssueStatus(issueId, status, authentication.getName()));
    }

    @PostMapping("/issues/{issueId}/comments")
    public ResponseEntity<IssueResponse> addComment(
            @PathVariable Long issueId,
            @RequestBody CommentRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(technicianService.addComment(issueId, request, authentication.getName()));
    }

    @PatchMapping("/issues/{issueId}/comments/{commentId}")
    public ResponseEntity<Void> updateComment(
            @PathVariable Long issueId,
            @PathVariable Long commentId,
            @RequestBody Map<String, String> request) {
        String text = request.get("text");
        technicianService.updateComment(issueId, commentId, text);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/issues/{issueId}/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long issueId,
            @PathVariable Long commentId) {
        technicianService.deleteComment(issueId, commentId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/issues/{issueId}")
    public ResponseEntity<Void> deleteResolvedIssue(@PathVariable Long issueId) {
        technicianService.deleteResolvedIssue(issueId);
        return ResponseEntity.ok().build();
    }
}
