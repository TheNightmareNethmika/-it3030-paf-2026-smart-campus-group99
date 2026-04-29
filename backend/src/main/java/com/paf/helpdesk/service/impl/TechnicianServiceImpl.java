package com.paf.helpdesk.service.impl;

import com.paf.helpdesk.dto.CommentRequest;
import com.paf.helpdesk.dto.CommentResponse;
import com.paf.helpdesk.dto.IssueResponse;
import com.paf.helpdesk.entity.Comment;
import com.paf.helpdesk.entity.Issue;
import com.paf.helpdesk.exception.ResourceNotFoundException;
import com.paf.helpdesk.repository.CommentRepository;
import com.paf.helpdesk.repository.IssueRepository;
import com.paf.helpdesk.service.InAppNotificationService;
import com.paf.helpdesk.service.TechnicianService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
public class TechnicianServiceImpl implements TechnicianService {

    private final IssueRepository issueRepository;
    private final CommentRepository commentRepository;
    private final InAppNotificationService inAppNotificationService;

    public TechnicianServiceImpl(IssueRepository issueRepository,
                                 CommentRepository commentRepository,
                                 InAppNotificationService inAppNotificationService) {
        this.issueRepository = issueRepository;
        this.commentRepository = commentRepository;
        this.inAppNotificationService = inAppNotificationService;
    }

    @Override
    public List<IssueResponse> getTechnicianIssues() {
        return getAssignedIssues()
                .stream()
                .map(this::mapToIssueResponse)
                .toList();
    }

    @Override
    public Map<String, Long> getTechnicianSummary() {
        List<Issue> issues = getAssignedIssues();

        Map<String, Long> summary = new LinkedHashMap<>();
        summary.put("total", (long) issues.size());
        summary.put("assigned", issues.stream().filter(i -> "ASSIGNED".equalsIgnoreCase(i.getTechnicianStatus())).count());
        summary.put("inProgress", issues.stream().filter(i -> "IN PROGRESS".equalsIgnoreCase(i.getTechnicianStatus())).count());
        summary.put("resolved", issues.stream().filter(i -> "RESOLVED".equalsIgnoreCase(i.getTechnicianStatus())).count());

        return summary;
    }

    @Override
    @Transactional
    public IssueResponse updateIssueStatus(Long issueId, String status, String actorEmail) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId));

        ensureIssueAssigned(issue);

        String previousTechnicianStatus = issue.getTechnicianStatus();
        String normalized = status == null ? "" : status.trim().toUpperCase();

        if (!List.of("IN PROGRESS", "RESOLVED").contains(normalized)) {
            throw new IllegalArgumentException("Technician can set only IN PROGRESS or RESOLVED.");
        }

        if ("ASSIGNED".equalsIgnoreCase(issue.getTechnicianStatus())) {
            if (!"IN PROGRESS".equals(normalized)) {
                throw new IllegalArgumentException("Assigned issues can only be moved to IN PROGRESS.");
            }
        }

        if ("IN PROGRESS".equalsIgnoreCase(issue.getTechnicianStatus())) {
            if (!"RESOLVED".equals(normalized)) {
                throw new IllegalArgumentException("In-progress issues can only be moved to RESOLVED.");
            }
        }

        if ("RESOLVED".equalsIgnoreCase(issue.getTechnicianStatus())) {
            throw new IllegalArgumentException("Resolved issues cannot be moved further by technician.");
        }

        issue.setTechnicianStatus(normalized);
        issueRepository.save(issue);
        inAppNotificationService.onTechnicianProgressChange(issue, previousTechnicianStatus, normalized, actorEmail);

        return mapToIssueResponse(issue);
    }

    @Override
    @Transactional
    public IssueResponse addComment(Long issueId, CommentRequest request, String actorEmail) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId));

        ensureIssueAssigned(issue);

        if (request.getText() == null || request.getText().trim().isEmpty()) {
            throw new IllegalArgumentException("Comment cannot be empty.");
        }

        Comment comment = new Comment();
        comment.setAuthorName(issue.getAssignedTechnicianName());
        comment.setAuthorEmail(issue.getAssignedTechnicianEmail());
        comment.setText(request.getText().trim());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setIssue(issue);
        comment.setParentCommentId(request.getParentCommentId());
        comment.setVisibility(resolveCommentVisibility(issue, request.getParentCommentId(), request.getVisibility()));

        Comment savedComment = commentRepository.saveAndFlush(comment);
        issue.getComments().add(savedComment);
        inAppNotificationService.onCommentFromTechnician(issue, actorEmail);

        return mapToIssueResponse(issue);
    }

    @Override
    @Transactional
    public void updateComment(Long issueId, Long commentId, String text) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId));

        ensureIssueAssigned(issue);

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));

        if (!comment.getIssue().getId().equals(issue.getId())) {
            throw new ResourceNotFoundException("Comment does not belong to this issue");
        }

        if (!issue.getAssignedTechnicianEmail().equalsIgnoreCase(comment.getAuthorEmail())) {
            throw new IllegalArgumentException("Technician can edit only their own comments.");
        }

        if (text == null || text.trim().isEmpty()) {
            throw new IllegalArgumentException("Comment cannot be empty.");
        }

        comment.setText(text.trim());
        commentRepository.save(comment);
    }

    @Override
    @Transactional
    public void deleteComment(Long issueId, Long commentId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId));

        ensureIssueAssigned(issue);

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));

        if (!comment.getIssue().getId().equals(issue.getId())) {
            throw new ResourceNotFoundException("Comment does not belong to this issue");
        }

        if (!issue.getAssignedTechnicianEmail().equalsIgnoreCase(comment.getAuthorEmail())) {
            throw new IllegalArgumentException("Technician can delete only their own comments.");
        }

        commentRepository.delete(comment);
    }

    @Override
    @Transactional
    public void deleteResolvedIssue(Long issueId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId));

        ensureIssueAssigned(issue);

        if (!"RESOLVED".equalsIgnoreCase(issue.getTechnicianStatus())) {
            throw new IllegalArgumentException("Only resolved technician issues can be removed.");
        }

        issue.setTechnicianStatus(null);
        issueRepository.save(issue);
    }

    private List<Issue> getAssignedIssues() {
        return issueRepository.findByTechnicianStatusIsNotNullOrderByAssignedAtDesc()
                .stream()
                .filter(issue -> issue.getAssignedTechnicianEmail() != null)
                .filter(issue -> !issue.getAssignedTechnicianEmail().isBlank())
                .filter(issue -> !"CLOSED".equalsIgnoreCase(issue.getStatus()))
                .toList();
    }

    private void ensureIssueAssigned(Issue issue) {
        if (issue.getAssignedTechnicianEmail() == null || issue.getAssignedTechnicianEmail().isBlank()) {
            throw new IllegalArgumentException("Issue is not assigned to a technician.");
        }

        if (issue.getTechnicianStatus() == null || issue.getTechnicianStatus().isBlank()) {
            throw new IllegalArgumentException("Issue is not active in the technician workflow.");
        }
    }

    private IssueResponse mapToIssueResponse(Issue issue) {
        IssueResponse response = new IssueResponse();
        response.setId(issue.getId());
        response.setTitle(issue.getTitle());
        response.setCategory(issue.getCategory());
        response.setPriority(issue.getPriority());
        response.setLocationType(issue.getLocationType());
        response.setBuilding(issue.getBuilding());
        response.setRoomNumber(issue.getRoomNumber());
        response.setAssetId(issue.getAssetId());
        response.setContactNumber(issue.getContactNumber());
        response.setIncidentDate(issue.getIncidentDate());
        response.setDescription(issue.getDescription());
        response.setReporterName(issue.getReporterName());
        response.setReporterEmail(issue.getReporterEmail());
        response.setStatus(issue.getStatus());
        response.setCreatedAt(issue.getCreatedAt());
        response.setImageUrls(issue.getImageUrls());

        response.setAssignedTechnicianName(issue.getAssignedTechnicianName());
        response.setAssignedTechnicianEmail(issue.getAssignedTechnicianEmail());
        response.setAssignedTeam(issue.getAssignedTeam());
        response.setAssignedAt(issue.getAssignedAt());
        response.setTechnicianStatus(issue.getTechnicianStatus());
        response.setVisibleToAdmin(issue.isVisibleToAdmin());

        List<CommentResponse> commentResponses = issue.getComments()
                .stream()
                .map(this::mapToCommentResponse)
                .toList();

        response.setComments(commentResponses);

        return response;
    }

    private CommentResponse mapToCommentResponse(Comment comment) {
        CommentResponse response = new CommentResponse();
        response.setId(comment.getId());
        response.setAuthorName(comment.getAuthorName());
        response.setAuthorEmail(comment.getAuthorEmail());
        response.setText(comment.getText());
        response.setCreatedAt(comment.getCreatedAt());
        response.setParentCommentId(comment.getParentCommentId());
        response.setImageUrls(comment.getImageUrls());
        response.setVisibility(comment.getVisibility());
        return response;
    }

    private String resolveCommentVisibility(Issue issue, Long parentCommentId, String requestedVisibility) {
        if (parentCommentId != null) {
            return issue.getComments()
                    .stream()
                    .filter(comment -> parentCommentId.equals(comment.getId()))
                    .findFirst()
                    .map(Comment::getVisibility)
                    .orElse("PUBLIC");
        }

        return "PRIVATE".equalsIgnoreCase(requestedVisibility) ? "PRIVATE" : "PUBLIC";
    }
}
