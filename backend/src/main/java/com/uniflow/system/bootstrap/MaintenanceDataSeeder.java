package com.uniflow.system.bootstrap;

import com.uniflow.system.model.MaintenanceRequest;
import com.uniflow.system.repository.MaintenanceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class MaintenanceDataSeeder implements CommandLineRunner {

    private final MaintenanceRepository maintenanceRepository;

    public MaintenanceDataSeeder(MaintenanceRepository maintenanceRepository) {
        this.maintenanceRepository = maintenanceRepository;
    }

    @Override
    public void run(String... args) {
        if (maintenanceRepository.count() > 0) {
            return;
        }

        String technicianEmail = "sewminiwijesiri5@gmail.com";

        MaintenanceRequest req1 = new MaintenanceRequest();
        req1.setResourceName("Computer Lab B2");
        req1.setDescription("Network switches in rack 4 are unresponsive. High latency reported by students.");
        req1.setTechnicianEmail(technicianEmail);
        req1.setPriority(MaintenanceRequest.MaintenancePriority.HIGH);
        req1.setStatus(MaintenanceRequest.MaintenanceStatus.PENDING);
        req1.setCreatedAt(LocalDateTime.now());

        MaintenanceRequest req2 = new MaintenanceRequest();
        req2.setResourceName("Lecture Hall A");
        req2.setDescription("Main projector bulb replacement needed. Brightness has dropped significantly.");
        req2.setTechnicianEmail(technicianEmail);
        req2.setPriority(MaintenanceRequest.MaintenancePriority.MEDIUM);
        req2.setStatus(MaintenanceRequest.MaintenanceStatus.IN_PROGRESS);
        req2.setCreatedAt(LocalDateTime.now());

        maintenanceRepository.saveAll(Arrays.asList(req1, req2));
    }
}
