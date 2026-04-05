package com.paf.helpdesk.config;

import com.paf.helpdesk.entity.Comment;
import com.paf.helpdesk.entity.Issue;
import com.paf.helpdesk.entity.Technician;
import com.paf.helpdesk.repository.IssueRepository;
import com.paf.helpdesk.repository.TechnicianRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(IssueRepository issueRepository, TechnicianRepository technicianRepository) {
        return args -> {
            if (issueRepository.count() > 0 || technicianRepository.count() > 0) {
                return;
            }

            Technician tech1 = technician(
                    "Lakmal Perera",
                    "lakmal.perera@helpdesk.edu",
                    "AV & Electrical",
                    "Projectors, smart boards, power faults",
                    "0711000001",
                    "AVAILABLE"
            );

            Technician tech2 = technician(
                    "Anushka Silva",
                    "anushka.silva@helpdesk.edu",
                    "IT & Network",
                    "PC labs, connectivity, internet faults",
                    "0711000002",
                    "AVAILABLE"
            );

            Technician tech3 = technician(
                    "Ishara Fernando",
                    "ishara.fernando@helpdesk.edu",
                    "Facilities & Furniture",
                    "Furniture, doors, fittings, building spaces",
                    "0711000003",
                    "BUSY"
            );

            Technician tech4 = technician(
                    "Harini Gomes",
                    "harini.gomes@helpdesk.edu",
                    "HVAC & Utilities",
                    "Air conditioning, ventilation, utility systems",
                    "0711000004",
                    "AVAILABLE"
            );

            Technician tech5 = technician(
                    "Pasan Weerakoon",
                    "pasan.weerakoon@helpdesk.edu",
                    "Water & Safety",
                    "Leaks, plumbing, hazards, safety cases",
                    "0711000005",
                    "AVAILABLE"
            );

            technicianRepository.saveAll(List.of(tech1, tech2, tech3, tech4, tech5));

            List<Issue> issues = new ArrayList<>();

            Issue t1 = new Issue();
            t1.setTitle("Projector flickering in Lecture Hall A");
            t1.setCategory("Laboratory Equipment");
            t1.setPriority("High");
            t1.setLocationType("Lecture Hall");
            t1.setBuilding("Main Building");
            t1.setRoomNumber("LH-A");
            t1.setAssetId("PJ-1102");
            t1.setContactNumber("0712345678");
            t1.setIncidentDate(LocalDate.of(2026, 4, 1));
            t1.setDescription("The projector display keeps flickering during lectures and becomes unreadable after a few minutes.");
            t1.setReporterName("Nimal Perera");
            t1.setReporterEmail("nimal@university.edu");
            t1.setStatus("IN PROGRESS");
            t1.setCreatedAt(LocalDateTime.of(2026, 4, 1, 9, 15));
            t1.setAssignedTechnicianName(tech1.getName());
            t1.setAssignedTechnicianEmail(tech1.getEmail());
            t1.setAssignedTeam(tech1.getTeam());
            t1.setAssignedAt(LocalDateTime.of(2026, 4, 1, 10, 0));
            t1.setImageUrls(List.of(
                    "/uploads/demo-projector-1.jpg",
                    "/uploads/demo-projector-2.jpg",
                    "/uploads/demo-projector-3.jpg"
            ));

            Comment t1c1 = comment("Lakmal Perera", tech1.getEmail(),
                    "Initial inspection completed. Likely display output instability from the projector unit.",
                    LocalDateTime.of(2026, 4, 2, 10, 0), t1, List.of("/uploads/demo-comment-tech-1.jpg"));

            Comment t1c2 = comment("Nimal Perera", "nimal@university.edu",
                    "Thank you. This affects the 8.30 AM lecture.", LocalDateTime.of(2026, 4, 2, 14, 30), t1, List.of());

            Comment t1c3 = comment("Lakmal Perera", tech1.getEmail(),
                    "Tested with backup cable and confirmed the projector needs replacement scheduling.",
                    LocalDateTime.of(2026, 4, 2, 17, 45), t1, List.of("/uploads/demo-comment-tech-2.jpg"));

            t1.setComments(new ArrayList<>(List.of(t1c1, t1c2, t1c3)));
            issues.add(t1);

            Issue t2 = new Issue();
            t2.setTitle("Broken chair in Computer Lab 03");
            t2.setCategory("Furniture");
            t2.setPriority("Medium");
            t2.setLocationType("Computer Lab");
            t2.setBuilding("Computing Building");
            t2.setRoomNumber("Lab 03");
            t2.setAssetId("");
            t2.setContactNumber("0771112233");
            t2.setIncidentDate(LocalDate.of(2026, 3, 31));
            t2.setDescription("A front-row chair has a damaged backrest and is unsafe for students.");
            t2.setReporterName("Ayesha Silva");
            t2.setReporterEmail("ayesha@university.edu");
            t2.setStatus("OPEN");
            t2.setCreatedAt(LocalDateTime.of(2026, 3, 31, 11, 20));
            t2.setAssignedTechnicianName(tech3.getName());
            t2.setAssignedTechnicianEmail(tech3.getEmail());
            t2.setAssignedTeam(tech3.getTeam());
            t2.setAssignedAt(LocalDateTime.of(2026, 4, 1, 8, 10));
            t2.setImageUrls(List.of(
                    "/uploads/demo-chair-1.jpg",
                    "/uploads/demo-chair-2.jpg"
            ));

            Comment t2c1 = comment("Ayesha Silva", "ayesha@university.edu",
                    "This is in the first row and students are avoiding that workstation now.",
                    LocalDateTime.of(2026, 4, 1, 8, 40), t2, List.of());

            Comment t2c2 = comment("Ishara Fernando", tech3.getEmail(),
                    "Chair marked and isolated. Replacement request sent to facilities store.",
                    LocalDateTime.of(2026, 4, 1, 16, 10), t2, List.of());

            Comment t2c3 = comment("Ayesha Silva", "ayesha@university.edu",
                    "Please replace before tomorrow’s practical session.", LocalDateTime.of(2026, 4, 2, 9, 5), t2, List.of());

            t2.setComments(new ArrayList<>(List.of(t2c1, t2c2, t2c3)));
            issues.add(t2);

            Issue t3 = new Issue();
            t3.setTitle("Water leakage near library entrance");
            t3.setCategory("Plumbing / Water");
            t3.setPriority("High");
            t3.setLocationType("Library");
            t3.setBuilding("Library");
            t3.setRoomNumber("Near main entrance");
            t3.setAssetId("");
            t3.setContactNumber("0769988776");
            t3.setIncidentDate(LocalDate.of(2026, 4, 2));
            t3.setDescription("Water is dripping continuously near the main library entrance and the floor is slippery.");
            t3.setReporterName("Sahan Jayawardena");
            t3.setReporterEmail("sahan@university.edu");
            t3.setStatus("RESOLVED");
            t3.setCreatedAt(LocalDateTime.of(2026, 4, 2, 7, 50));
            t3.setAssignedTechnicianName(tech5.getName());
            t3.setAssignedTechnicianEmail(tech5.getEmail());
            t3.setAssignedTeam(tech5.getTeam());
            t3.setAssignedAt(LocalDateTime.of(2026, 4, 2, 8, 25));
            t3.setImageUrls(List.of("/uploads/demo-water-1.jpg"));

            Comment t3c1 = comment("Pasan Weerakoon", tech5.getEmail(),
                    "Leak isolated and floor area secured for repair.",
                    LocalDateTime.of(2026, 4, 2, 12, 15), t3, List.of("/uploads/demo-water-fix.jpg"));

            Comment t3c2 = comment("Sahan Jayawardena", "sahan@university.edu",
                    "Confirmed. Entrance area is safe now.", LocalDateTime.of(2026, 4, 2, 15, 25), t3, List.of());

            t3.setComments(new ArrayList<>(List.of(t3c1, t3c2)));
            issues.add(t3);

            issueRepository.saveAll(issues);
        };
    }

    private Technician technician(String name, String email, String team, String specialization, String phone, String status) {
        Technician t = new Technician();
        t.setName(name);
        t.setEmail(email);
        t.setTeam(team);
        t.setSpecialization(specialization);
        t.setPhone(phone);
        t.setStatus(status);
        return t;
    }

    private Comment comment(String name, String email, String text, LocalDateTime time, Issue issue, List<String> imageUrls) {
        Comment c = new Comment();
        c.setAuthorName(name);
        c.setAuthorEmail(email);
        c.setText(text);
        c.setCreatedAt(time);
        c.setIssue(issue);
        c.setImageUrls(imageUrls);
        return c;
    }
}