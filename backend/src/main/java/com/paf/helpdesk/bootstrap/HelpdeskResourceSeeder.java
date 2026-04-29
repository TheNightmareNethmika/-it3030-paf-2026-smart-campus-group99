package com.paf.helpdesk.bootstrap;

import com.paf.helpdesk.entity.Resource;
import com.paf.helpdesk.entity.ResourceStatus;
import com.paf.helpdesk.entity.ResourceType;
import com.paf.helpdesk.repository.ResourceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.Arrays;

@Component
public class HelpdeskResourceSeeder implements CommandLineRunner {

    private final ResourceRepository resourceRepository;

    public HelpdeskResourceSeeder(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    @Override
    public void run(String... args) {
        if (resourceRepository.count() > 0) {
            return;
        }

        resourceRepository.saveAll(Arrays.asList(
                Resource.builder()
                        .name("Lecture Hall A")
                        .type(ResourceType.LECTURE_HALL)
                        .capacity(250)
                        .location("Main Building, Ground Floor")
                        .availableStartTime(LocalTime.of(8, 0))
                        .availableEndTime(LocalTime.of(18, 0))
                        .status(ResourceStatus.WORKING)
                        .description("Large lecture hall")
                        .build(),
                Resource.builder()
                        .name("Computer Lab B2")
                        .type(ResourceType.COMPUTER_LAB)
                        .capacity(40)
                        .location("Engineering Block, Level 2")
                        .availableStartTime(LocalTime.of(8, 0))
                        .availableEndTime(LocalTime.of(17, 0))
                        .status(ResourceStatus.WORKING)
                        .description("General-purpose lab")
                        .build(),
                Resource.builder()
                        .name("Meeting Room Admin 1")
                        .type(ResourceType.MEETING_ROOM)
                        .capacity(10)
                        .location("Administration Block, Level 3")
                        .availableStartTime(LocalTime.of(9, 0))
                        .availableEndTime(LocalTime.of(17, 0))
                        .status(ResourceStatus.WORKING)
                        .description("Small meeting room")
                        .build()
        ));
    }
}
