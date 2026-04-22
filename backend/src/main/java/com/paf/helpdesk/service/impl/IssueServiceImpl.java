package com.paf.helpdesk.service.impl;

import com.paf.helpdesk.dto.CommentRequest;
import com.paf.helpdesk.dto.CommentResponse;
import com.paf.helpdesk.dto.IssueCreateRequest;
import com.paf.helpdesk.dto.IssueResponse;
import com.paf.helpdesk.entity.Comment;
import com.paf.helpdesk.entity.Issue;
import com.paf.helpdesk.exception.ResourceNotFoundException;
import com.paf.helpdesk.exception.UnauthorizedActionException;
import com.paf.helpdesk.repository.CommentRepository;
import com.paf.helpdesk.repository.IssueRepository;
import com.paf.helpdesk.service.IssueService;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import java.time.LocalDateTime;
import java.util.List;



@Service
public class IssueServiceImpl implements IssueService {

    private final IssueRepository issueRepository;
    private final CommentRepository commentRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public IssueServiceImpl(IssueRepository issueRepository, CommentRepository commentRepository) {
        this.issueRepository = issueRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public IssueResponse createIssue(IssueCreateRequest request, List<MultipartFile> images, String userEmail, String userName) {
        Issue issue = new Issue();
        issue.setTitle(request.getTitle());
        issue.setCategory(request.getCategory());
        issue.setPriority(request.getPriority());
        issue.setLocationType(request.getLocationType());
        issue.setBuilding(request.getBuilding());
        issue.setRoomNumber(request.getRoomNumber());
        issue.setAssetId(request.getAssetId());
        issue.setContactNumber(request.getContactNumber());
        issue.setIncidentDate(request.getIncidentDate());
        issue.setDescription(request.getDescription());
        issue.setReporterEmail(userEmail);
        issue.setReporterName(userName);
        issue.setStatus("OPEN");
        issue.setCreatedAt(LocalDateTime.now());
        if (images != null && !images.isEmpty()) {
        issue.setImageUrls(saveIssueImages(images));
        }

        Issue savedIssue = issueRepository.save(issue);
        return mapToIssueResponse(savedIssue);
    }

    @Override
    public List<IssueResponse> getAllIssues() {
        return issueRepository.findAllByOrderByIdDesc()
                .stream()
                .map(this::mapToIssueResponse)
                .toList();
    }

    @Override
    public List<IssueResponse> getMyIssues(String email) {
        return issueRepository.findByReporterEmailOrderByCreatedAtDesc(email)
                .stream()
                .map(this::mapToIssueResponse)
                .toList();
    }

    @Override
    public IssueResponse getIssueById(Long id) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + id));

        return mapToIssueResponse(issue);
    }

    @Override
    public IssueResponse addComment(Long issueId, CommentRequest request, List<MultipartFile> images, String email, String name) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId));

        boolean hasText = request.getText() != null && !request.getText().trim().isEmpty();
        boolean hasImages = images != null && !images.isEmpty();

        if (!hasText && !hasImages) {
            throw new IllegalArgumentException("Add text or at least one image.");
        }

        Comment comment = new Comment();
        comment.setAuthorEmail(email);
        comment.setAuthorName(name);
        comment.setText(hasText ? request.getText().trim() : "");
        comment.setCreatedAt(LocalDateTime.now());
        comment.setIssue(issue);
        comment.setParentCommentId(request.getParentCommentId());

        if (images != null && !images.isEmpty()) {
            comment.setImageUrls(saveCommentImages(images));
        }

        commentRepository.save(comment);

        return mapToIssueResponse(issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId)));
    }

    @Override
    public IssueResponse closeIssue(Long id, String email) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + id));

        if (!issue.getReporterEmail().equalsIgnoreCase(email)) {
            throw new UnauthorizedActionException("You are not allowed to close this issue");
        }

        if (!"OPEN".equalsIgnoreCase(issue.getStatus()) && !"RESOLVED".equalsIgnoreCase(issue.getStatus())) {
            throw new IllegalArgumentException("You can close a ticket only when it is OPEN or RESOLVED.");
        }

        issue.setStatus("CLOSED");
        issue.setVisibleToAdmin(false);

        Issue updatedIssue = issueRepository.save(issue);
        return mapToIssueResponse(updatedIssue);
    }

    @Override
    public void deleteIssue(Long id, String email) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + id));

        if (!issue.getReporterEmail().equalsIgnoreCase(email)) {
            throw new UnauthorizedActionException("You are not allowed to delete this issue");
        }

        if (!"CLOSED".equalsIgnoreCase(issue.getStatus())) {
            throw new IllegalArgumentException("Only closed issues can be deleted.");
        }

        issueRepository.delete(issue);
    }

    @Override
    public void deleteComment(Long issueId, Long commentId, String email) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));

        if (!comment.getIssue().getId().equals(issue.getId())) {
            throw new ResourceNotFoundException("Comment does not belong to this issue");
        }

        if (!comment.getAuthorEmail().equals(email)) {
            throw new UnauthorizedActionException("You are not allowed to delete this comment");
        }

        commentRepository.delete(comment);
    }

    @Override
    public IssueResponse updateComment(Long issueId,
                                       Long commentId,
                                       CommentRequest request,
                                       List<String> existingImageUrls,
                                       List<MultipartFile> newImages,
                                       String email) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));

        if (!comment.getIssue().getId().equals(issue.getId())) {
            throw new ResourceNotFoundException("Comment does not belong to this issue");
        }

        if (!comment.getAuthorEmail().equals(email)) {
            throw new UnauthorizedActionException("You are not allowed to edit this comment");
        }

        boolean hasText = request.getText() != null && !request.getText().trim().isEmpty();
        boolean hasExistingImages = existingImageUrls != null && !existingImageUrls.isEmpty();
        boolean hasNewImages = newImages != null && !newImages.isEmpty();

        if (!hasText && !hasExistingImages && !hasNewImages) {
            throw new IllegalArgumentException("Add text or at least one image.");
        }

        comment.setText(hasText ? request.getText().trim() : "");

        List<String> updatedImageUrls = new java.util.ArrayList<>();

        if (existingImageUrls != null) {
            updatedImageUrls.addAll(existingImageUrls);
        }

        if (hasNewImages) {
            updatedImageUrls.addAll(saveCommentImages(newImages));
        }

        comment.setImageUrls(updatedImageUrls);
        commentRepository.save(comment);

        Issue updatedIssue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found with id: " + issueId));

        return mapToIssueResponse(updatedIssue);
    }
        private List<String> saveCommentImages(List<MultipartFile> images) {
        List<String> imageUrls = new java.util.ArrayList<>();

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            for (MultipartFile image : images) {
                if (image != null && !image.isEmpty()) {
                    String originalFilename = image.getOriginalFilename();
                    String extension = "";

                    if (originalFilename != null && originalFilename.contains(".")) {
                        extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                    }

                    String uniqueFilename = UUID.randomUUID() + extension;
                    Path filePath = uploadPath.resolve(uniqueFilename);

                    Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                    imageUrls.add("/uploads/" + uniqueFilename);
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to save comment images", e);
        }

        return imageUrls;
    }
        private List<String> saveIssueImages(List<MultipartFile> images) {
        List<String> imageUrls = new java.util.ArrayList<>();

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            for (MultipartFile image : images) {
                if (image != null && !image.isEmpty()) {
                    String originalFilename = image.getOriginalFilename();
                    String extension = "";

                    if (originalFilename != null && originalFilename.contains(".")) {
                        extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                    }

                    String uniqueFilename = UUID.randomUUID() + extension;
                    Path filePath = uploadPath.resolve(uniqueFilename);

                    Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                    imageUrls.add("/uploads/" + uniqueFilename);
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to save issue images", e);
        }

        return imageUrls;
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
        return response;
    }
}
