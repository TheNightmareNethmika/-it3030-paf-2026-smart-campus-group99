package com.paf.helpdesk.service;

import com.paf.helpdesk.dto.CommentRequest;
import com.paf.helpdesk.dto.IssueResponse;

import java.util.List;
import java.util.Map;

public interface TechnicianService {

    List<IssueResponse> getTechnicianIssues();

    Map<String, Long> getTechnicianSummary();

    IssueResponse updateIssueStatus(Long issueId, String status, String actorEmail);

    IssueResponse addComment(Long issueId, CommentRequest request, String actorEmail);

    void updateComment(Long issueId, Long commentId, String text);

    void deleteComment(Long issueId, Long commentId);

    void deleteResolvedIssue(Long issueId);
}
