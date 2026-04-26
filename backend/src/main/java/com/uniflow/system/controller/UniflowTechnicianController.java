package com.uniflow.system.controller;

import com.uniflow.system.model.MaintenanceRequest;
import com.uniflow.system.service.MaintenanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Maintenance tasks for campus technicians (UniFlow). Coexists with
 * {@link com.paf.helpdesk.controller.HelpdeskTechnicianController} (issue stack) on the same
 * <code>/api/technician</code> path prefix but different sub-paths.
 */
@RestController
@RequestMapping("/api/technician")
@CrossOrigin(origins = "${FRONTEND_URL:http://localhost:3100}")
public class UniflowTechnicianController {

    private final MaintenanceService maintenanceService;

    public UniflowTechnicianController(MaintenanceService maintenanceService) {
        this.maintenanceService = maintenanceService;
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<MaintenanceRequest>> getTasks(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(maintenanceService.getRequestsForTechnician(email));
    }

    @PutMapping("/tasks/{id}/status")
    public ResponseEntity<MaintenanceRequest> updateTaskStatus(
            @PathVariable String id,
            @RequestParam MaintenanceRequest.MaintenanceStatus status) {
        return ResponseEntity.ok(maintenanceService.updateStatus(id, status));
    }

    @GetMapping("/test")
    public String technicianTest() {
        return "Welcome TECHNICIAN!";
    }
}
