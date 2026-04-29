package com.paf.helpdesk.service;

import com.paf.helpdesk.dto.IssueResponse;
import com.paf.helpdesk.dto.TechnicianResponse;

import java.util.List;
import java.util.Map;

public interface AdminService {

    List<IssueResponse> getAdminIssues();

    List<TechnicianResponse> getTechnicians();

    IssueResponse updateIssueStatus(Long issueId, String status, String actorEmail);

    IssueResponse assignTechnician(Long issueId, Long technicianId, String actorEmail);

    IssueResponse unassignTechnician(Long issueId, String actorEmail);

    IssueResponse addAdminComment(Long issueId, String text, Long parentCommentId, String visibility, String actorEmail);

    IssueResponse updateAdminComment(Long issueId, Long commentId, String text);

    void deleteAdminComment(Long issueId, Long commentId);

    void deleteResolvedIssue(Long issueId);

    Map<String, Long> getSummary();
}
