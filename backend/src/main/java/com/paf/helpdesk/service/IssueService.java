package com.paf.helpdesk.service;

import com.paf.helpdesk.dto.CommentRequest;
import com.paf.helpdesk.dto.IssueCreateRequest;
import com.paf.helpdesk.dto.IssueResponse;

import java.util.List;

public interface IssueService {

    IssueResponse createIssue(IssueCreateRequest request, List<org.springframework.web.multipart.MultipartFile> images, String userEmail, String userName);

    List<IssueResponse> getAllIssues();

    IssueResponse getIssueById(Long id);

    List<IssueResponse> getMyIssues(String email);

    IssueResponse addComment(Long issueId, CommentRequest request, List<org.springframework.web.multipart.MultipartFile> images, String email, String name);

    IssueResponse closeIssue(Long id, String email);

    void deleteIssue(Long id, String email);

    void deleteComment(Long issueId, Long commentId, String email);

        IssueResponse updateComment(Long issueId,
                                Long commentId,
                                CommentRequest request,
                                List<String> existingImageUrls,
                                List<org.springframework.web.multipart.MultipartFile> newImages,
                                String email);
}