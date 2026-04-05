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

    IssueResponse addAdminComment(Long issueId, String text);

    void deleteResolvedIssue(Long issueId);

    Map<String, Long> getSummary();
}