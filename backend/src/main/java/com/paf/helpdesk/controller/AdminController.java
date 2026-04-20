package com.paf.helpdesk.controller;

import com.paf.helpdesk.dto.AssignTechnicianRequest;
import com.paf.helpdesk.dto.CommentRequest;
import com.paf.helpdesk.dto.IssueResponse;
import com.paf.helpdesk.dto.StatusUpdateRequest;
import com.paf.helpdesk.dto.TechnicianResponse;
import com.paf.helpdesk.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/issues")
    public List<IssueResponse> getAdminIssues() {
        return adminService.getAdminIssues();
    }

    @GetMapping("/technicians")
    public List<TechnicianResponse> getTechnicians() {
        return adminService.getTechnicians();
    }

    @GetMapping("/summary")
    public Map<String, Long> getSummary() {
        return adminService.getSummary();
    }

    @PatchMapping("/issues/{issueId}/status")
    public IssueResponse updateIssueStatus(@PathVariable Long issueId,
                                           @Valid @RequestBody StatusUpdateRequest request) {
        return adminService.updateIssueStatus(issueId, request.getStatus());
    }

    @PatchMapping("/issues/{issueId}/assign")
    public IssueResponse assignTechnician(@PathVariable Long issueId,
                                          @RequestBody AssignTechnicianRequest request) {
        return adminService.assignTechnician(issueId, request.getTechnicianId());
    }

    @PostMapping("/issues/{issueId}/comments")
    public IssueResponse addAdminComment(@PathVariable Long issueId,
                                         @RequestBody CommentRequest request) {
        return adminService.addAdminComment(issueId, request.getText(), request.getParentCommentId());
    }

    @PatchMapping("/issues/{issueId}/comments/{commentId}")
    public IssueResponse updateAdminComment(@PathVariable Long issueId,
                                            @PathVariable Long commentId,
                                            @RequestBody CommentRequest request) {
        return adminService.updateAdminComment(issueId, commentId, request.getText());
    }

    @DeleteMapping("/issues/{issueId}/comments/{commentId}")
    public void deleteAdminComment(@PathVariable Long issueId,
                                   @PathVariable Long commentId) {
        adminService.deleteAdminComment(issueId, commentId);
    }

    @DeleteMapping("/issues/{issueId}")
    public void deleteResolvedIssue(@PathVariable Long issueId) {
        adminService.deleteResolvedIssue(issueId);
    }
}