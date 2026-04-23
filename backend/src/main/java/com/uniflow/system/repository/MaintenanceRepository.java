package com.uniflow.system.repository;

import com.uniflow.system.model.MaintenanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MaintenanceRepository extends JpaRepository<MaintenanceRequest, String> {
    List<MaintenanceRequest> findByTechnicianEmail(String technicianEmail);
    List<MaintenanceRequest> findByStatus(MaintenanceRequest.MaintenanceStatus status);
}
