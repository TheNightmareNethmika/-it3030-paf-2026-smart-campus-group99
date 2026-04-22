package com.smartcampus.dto;

import com.smartcampus.model.ResourceStatus;
import com.smartcampus.model.ResourceType;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceRequestDTO {

    @NotBlank(message = "Resource name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @NotNull(message = "Resource type is required")
    private ResourceType type;

    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer capacity;

    @NotBlank(message = "Location is required")
    @Size(max = 200, message = "Location must not exceed 200 characters")
    private String location;

    @NotNull(message = "Available start time is required")
    private LocalTime availableStartTime;

    @NotNull(message = "Available end time is required")
    private LocalTime availableEndTime;

    @NotNull(message = "Status is required")
    private ResourceStatus status;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;
}
