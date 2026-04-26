package com.paf.helpdesk.controller;

import com.paf.helpdesk.dto.CommentRequest;
import com.paf.helpdesk.dto.IssueCreateRequest;
import com.paf.helpdesk.dto.IssueResponse;
import com.paf.helpdesk.service.IssueService;
import com.uniflow.system.model.User;
import com.uniflow.system.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "*")
public class IssueController {

    private final IssueService issueService;
    private final UserRepository userRepository;

    public IssueController(IssueService issueService, UserRepository userRepository) {
        this.issueService = issueService;
        this.userRepository = userRepository;
    }

    /** JWT subject is email; name comes from the user profile when present. */
    private String reporterNameFor(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmailIgnoreCase(email)
                .map(User::getName)
                .filter(n -> n != null && !n.isBlank())
                .orElseGet(() -> {
                    int at = email.indexOf('@');
                    return at > 0 ? email.substring(0, at) : email;
                });
    }

    // Create Issue
    @PostMapping(consumes = {"multipart/form-data"})
    @ResponseStatus(HttpStatus.CREATED)
    public IssueResponse createIssue(@Valid @ModelAttribute IssueCreateRequest request,
                                     @RequestParam(value = "images", required = false) List<MultipartFile> images,
                                     Authentication authentication) {
        String email = authentication.getName();
        return issueService.createIssue(request, images, email, reporterNameFor(authentication));
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
    public List<IssueResponse> getMyIssues(Authentication authentication) {
        return issueService.getMyIssues(authentication.getName());
    }

    // Add comment
    @PostMapping(value = "/{id}/comments", consumes = {"multipart/form-data"})
    public IssueResponse addComment(@PathVariable Long id,
                                    @Valid @ModelAttribute CommentRequest request,
                                    @RequestParam(value = "images", required = false) List<MultipartFile> images,
                                    Authentication authentication) {
        return issueService.addComment(id, request, images, authentication.getName(), reporterNameFor(authentication));
    }

    @DeleteMapping("/{issueId}/comments/{commentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable Long issueId, @PathVariable Long commentId, Authentication authentication) {
        issueService.deleteComment(issueId, commentId, authentication.getName());
    }

    @PatchMapping(value = "/{issueId}/comments/{commentId}", consumes = {"multipart/form-data"})
    public IssueResponse updateComment(@PathVariable Long issueId,
                                       @PathVariable Long commentId,
                                       @ModelAttribute CommentRequest request,
                                       @RequestParam(value = "existingImageUrls", required = false) List<String> existingImageUrls,
                                       @RequestParam(value = "images", required = false) List<MultipartFile> images,
                                       Authentication authentication) {
        return issueService.updateComment(issueId, commentId, request, existingImageUrls, images, authentication.getName());
    }

    // Close issue
    @PatchMapping("/{id}/close")
    public IssueResponse closeIssue(@PathVariable Long id, Authentication authentication) {
        return issueService.closeIssue(id, authentication.getName());
    }

    // Delete issue
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteIssue(@PathVariable Long id, Authentication authentication) {
        issueService.deleteIssue(id, authentication.getName());
    }
}