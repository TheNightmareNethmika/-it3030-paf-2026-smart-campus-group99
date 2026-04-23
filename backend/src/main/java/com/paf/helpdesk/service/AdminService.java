package com.paf.helpdesk.service;

import com.paf.helpdesk.dto.IssueResponse;
import com.paf.helpdesk.dto.TechnicianResponse;

import java.util.List;
import java.util.Map;

public interface AdminService {

    List<IssueResponse> getAdminIssues();

    List<TechnicianResponse> getTechnicians();

    IssueResponse updateIssueStatus(Long issueId, String status);

    IssueResponse assignTechnician(Long issueId, Long technicianId);

    IssueResponse unassignTechnician(Long issueId);

    IssueResponse addAdminComment(Long issueId, String text, Long parentCommentId, String visibility);

    IssueResponse updateAdminComment(Long issueId, Long commentId, String text);

    void deleteAdminComment(Long issueId, Long commentId);

    void deleteResolvedIssue(Long issueId);

    Map<String, Long> getSummary();
}
