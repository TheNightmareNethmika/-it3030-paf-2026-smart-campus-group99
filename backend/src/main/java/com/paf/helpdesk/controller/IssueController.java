package com.paf.helpdesk.controller;

import com.paf.helpdesk.dto.CommentRequest;
import com.paf.helpdesk.dto.IssueCreateRequest;
import com.paf.helpdesk.dto.IssueResponse;
import com.paf.helpdesk.service.IssueService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "*")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    // Create Issue
    @PostMapping(consumes = {"multipart/form-data"})
    @ResponseStatus(HttpStatus.CREATED)
    public IssueResponse createIssue(@Valid @ModelAttribute IssueCreateRequest request,
                                     @RequestParam(value = "images", required = false) List<MultipartFile> images) {
        return issueService.createIssue(request, images, "student@sliit.lk", "Student User");
    }

    // Get all issues
    @GetMapping
    public List<IssueResponse> getAllIssues() {
        return issueService.getAllIssues();
    }

    // Get one issue
    @GetMapping("/{id}")
    public IssueResponse getIssueById(@PathVariable Long id) {
        return issueService.getIssueById(id);
    }

    // Get my issues
    @GetMapping("/my")
    public List<IssueResponse> getMyIssues() {
        return issueService.getMyIssues("student@sliit.lk");
    }

    // Add comment
    @PostMapping(value = "/{id}/comments", consumes = {"multipart/form-data"})
    public IssueResponse addComment(@PathVariable Long id,
                                    @Valid @ModelAttribute CommentRequest request,
                                    @RequestParam(value = "images", required = false) List<MultipartFile> images) {
        return issueService.addComment(id, request, images, "student@sliit.lk", "Student User");
    }

    @DeleteMapping("/{issueId}/comments/{commentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable Long issueId, @PathVariable Long commentId) {
        issueService.deleteComment(issueId, commentId, "student@sliit.lk");
    }

    @PatchMapping(value = "/{issueId}/comments/{commentId}", consumes = {"multipart/form-data"})
    public IssueResponse updateComment(@PathVariable Long issueId,
                                       @PathVariable Long commentId,
                                       @ModelAttribute CommentRequest request,
                                       @RequestParam(value = "existingImageUrls", required = false) List<String> existingImageUrls,
                                       @RequestParam(value = "images", required = false) List<MultipartFile> images) {
        return issueService.updateComment(issueId, commentId, request, existingImageUrls, images, "student@sliit.lk");
    }

    // Close issue
    @PatchMapping("/{id}/close")
    public IssueResponse closeIssue(@PathVariable Long id) {
        return issueService.closeIssue(id, "student@sliit.lk");
    }

    // Delete issue
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteIssue(@PathVariable Long id) {
        issueService.deleteIssue(id, "student@sliit.lk");
    }
}