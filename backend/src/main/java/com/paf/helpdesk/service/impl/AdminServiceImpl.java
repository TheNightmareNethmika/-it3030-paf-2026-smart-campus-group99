package com.paf.helpdesk.service.impl;

import com.paf.helpdesk.dto.CommentResponse;
import com.paf.helpdesk.dto.IssueResponse;
import com.paf.helpdesk.dto.TechnicianResponse;
import com.paf.helpdesk.entity.Comment;
import com.paf.helpdesk.entity.Issue;
import com.paf.helpdesk.entity.Technician;
import com.paf.helpdesk.exception.ResourceNotFoundException;
import com.paf.helpdesk.repository.CommentRepository;
import com.paf.helpdesk.repository.IssueRepository;
import com.paf.helpdesk.repository.TechnicianRepository;
import com.paf.helpdesk.service.AdminService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminServiceImpl implements AdminService {

    private final IssueRepository issueRepository;
    private final TechnicianRepository technicianRepository;
    private final CommentRepository commentRepository;

    public AdminServiceImpl(IssueRepository issueRepository,
                            TechnicianRepository technicianRepository,
                            CommentRepository commentRepository) {
        this.issueRepository = issueRepository;
        this.technicianRepository = technicianRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public List<IssueResponse> getAdminIssues() {
        return issueRepository.findByVisibleToAdminTrueOrderByIdDesc()
                .stream()
                .filter(issue -> !"CLOSED".equalsIgnoreCase(issue.getStatus()))
                .map(this::mapToIssueResponse)
                .toList();
    }

    @Override
    public List<TechnicianResponse> getTechnicians() {
        return technicianRepository.findAllByOrderByTeamAscNameAsc()
                .stream()
                .map(this::mapToTechnicianResponse)
                .toList();
    }

    @Override
    public IssueResponse updateIssueStatus(Long issueId, String status) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId));

        String normalized = status == null ? "" : status.trim().toUpperCase();

        if (!List.of("IN PROGRESS", "RESOLVED").contains(normalized)) {
            throw new IllegalArgumentException("Admin can set only IN PROGRESS or RESOLVED.");
        }

        if ("OPEN".equalsIgnoreCase(issue.getStatus())) {
            if (!"IN PROGRESS".equals(normalized)) {
                throw new IllegalArgumentException("Open issues can only be moved to IN PROGRESS.");
            }

            if (issue.getAssignedTechnicianEmail() == null || issue.getAssignedTechnicianEmail().isBlank()) {
                throw new IllegalArgumentException("Assign a technician before setting IN PROGRESS.");
            }
        }

        if ("IN PROGRESS".equalsIgnoreCase(issue.getStatus())) {
            if (!"RESOLVED".equals(normalized)) {
                throw new IllegalArgumentException("In-progress issues can only be moved to RESOLVED.");
            }
        }

        if ("RESOLVED".equalsIgnoreCase(issue.getStatus())) {
            throw new IllegalArgumentException("Resolved issues cannot be moved further by admin.");
        }

        issue.setStatus(normalized);
        issueRepository.save(issue);

        return mapToIssueResponse(issue);
    }

    @Override
    public IssueResponse assignTechnician(Long issueId, Long technicianId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId));

        Technician technician = technicianRepository.findById(technicianId)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found with id: " + technicianId));

        issue.setAssignedTechnicianName(technician.getName());
        issue.setAssignedTechnicianEmail(technician.getEmail());
        issue.setAssignedTeam(technician.getTeam());
        issue.setAssignedAt(LocalDateTime.now());
        issue.setTechnicianStatus("ASSIGNED");

        issueRepository.save(issue);

        return mapToIssueResponse(issue);
    }

    @Override
    public IssueResponse addAdminComment(Long issueId, String text, Long parentCommentId, String visibility) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId));

        if (text == null || text.trim().isEmpty()) {
            throw new IllegalArgumentException("Comment cannot be empty.");
        }

        Comment comment = new Comment();
        comment.setAuthorName("Admin Control Desk");
        comment.setAuthorEmail("admin@helpdesk.edu");
        comment.setText(text.trim());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setIssue(issue);
        comment.setParentCommentId(parentCommentId);
        comment.setVisibility(resolveCommentVisibility(issue, parentCommentId, visibility));

        Comment savedComment = commentRepository.saveAndFlush(comment);
        issue.getComments().add(savedComment);

        return mapToIssueResponse(issue);
    }

    @Override
    public IssueResponse updateAdminComment(Long issueId, Long commentId, String text) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));

        if (!comment.getIssue().getId().equals(issue.getId())) {
            throw new ResourceNotFoundException("Comment does not belong to this issue");
        }

        if (!"admin@helpdesk.edu".equalsIgnoreCase(comment.getAuthorEmail())) {
            throw new IllegalArgumentException("Admin can edit only admin comments.");
        }

        if (text == null || text.trim().isEmpty()) {
            throw new IllegalArgumentException("Comment cannot be empty.");
        }

        comment.setText(text.trim());
        commentRepository.save(comment);

        return mapToIssueResponse(
                issueRepository.findById(issueId)
                        .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId))
        );
    }

    @Override
    public void deleteAdminComment(Long issueId, Long commentId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));

        if (!comment.getIssue().getId().equals(issue.getId())) {
            throw new ResourceNotFoundException("Comment does not belong to this issue");
        }

        if (!"admin@helpdesk.edu".equalsIgnoreCase(comment.getAuthorEmail())) {
            throw new IllegalArgumentException("Admin can delete only admin comments.");
        }

        commentRepository.delete(comment);
    }

    @Override
    public void deleteResolvedIssue(Long issueId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId));

        if (!"RESOLVED".equalsIgnoreCase(issue.getStatus())) {
            throw new IllegalArgumentException("Only resolved issues can be removed from admin workflow.");
        }

        issue.setVisibleToAdmin(false);
        issueRepository.save(issue);
    }

    @Override
    public Map<String, Long> getSummary() {
        List<Issue> issues = issueRepository.findByVisibleToAdminTrueOrderByIdDesc()
                .stream()
                .filter(i -> !"CLOSED".equalsIgnoreCase(i.getStatus()))
                .toList();

        Map<String, Long> summary = new LinkedHashMap<>();
        summary.put("total", (long) issues.size());
        summary.put("open", issues.stream().filter(i -> "OPEN".equalsIgnoreCase(i.getStatus())).count());
        summary.put("inProgress", issues.stream().filter(i -> "IN PROGRESS".equalsIgnoreCase(i.getStatus())).count());
        summary.put("resolved", issues.stream().filter(i -> "RESOLVED".equalsIgnoreCase(i.getStatus())).count());
        summary.put("unassigned", issues.stream().filter(i -> i.getAssignedTechnicianEmail() == null || i.getAssignedTechnicianEmail().isBlank()).count());

        return summary;
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

    private TechnicianResponse mapToTechnicianResponse(Technician technician) {
        TechnicianResponse response = new TechnicianResponse();
        response.setId(technician.getId());
        response.setName(technician.getName());
        response.setEmail(technician.getEmail());
        response.setTeam(technician.getTeam());
        response.setSpecialization(technician.getSpecialization());
        response.setPhone(technician.getPhone());
        response.setStatus(technician.getStatus());
        return response;
    }
}
