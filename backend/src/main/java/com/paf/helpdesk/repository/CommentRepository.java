package com.paf.helpdesk.repository;

import com.paf.helpdesk.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}