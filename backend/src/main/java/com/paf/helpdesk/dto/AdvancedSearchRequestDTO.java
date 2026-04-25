package com.paf.helpdesk.dto;

import com.paf.helpdesk.entity.ResourceStatus;
import com.paf.helpdesk.entity.ResourceType;
import lombok.Data;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AdvancedSearchRequestDTO {
    
    private String query; // Natural language query like "Lab, capacity > 30, available tomorrow morning"
    
    // Basic filters
    private String name;
    private ResourceType type;
    private ResourceStatus status;
    private String location;
    
    // Capacity filters
    @Min(0)
    private Integer minCapacity;
    @Min(0)
    private Integer maxCapacity;
    
    // Date/time availability filters
    private LocalDateTime availableFrom;
    private LocalDateTime availableTo;
    private String timeOfDay; // "morning", "afternoon", "evening", "night"
    private String dayOfWeek; // "monday", "tuesday", etc.
    
    // Multi-select filters
    private List<ResourceType> types;
    private List<ResourceStatus> statuses;
    private List<String> locations;
    
    // Sorting
    private String sortBy = "name";
    private String sortOrder = "asc";
    
    // Pagination
    @Min(0)
    private int page = 0;
    @Min(1)
    @Max(100)
    private int size = 20;
}
