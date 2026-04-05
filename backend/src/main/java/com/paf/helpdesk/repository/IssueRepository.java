package com.paf.helpdesk.repository;

import com.paf.helpdesk.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {

    List<Issue> findByReporterEmailOrderByCreatedAtDesc(String reporterEmail);

    List<Issue> findAllByOrderByIdDesc();

    List<Issue> findByAssignedTechnicianEmailOrderByCreatedAtDesc(String assignedTechnicianEmail);

    List<Issue> findByVisibleToAdminTrueOrderByIdDesc();
}