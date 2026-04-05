package com.paf.helpdesk.repository;

import com.paf.helpdesk.entity.Technician;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TechnicianRepository extends JpaRepository<Technician, Long> {

    List<Technician> findAllByOrderByTeamAscNameAsc();

    Optional<Technician> findByEmail(String email);
}