package com.paf.helpdesk.service;

import com.paf.helpdesk.dto.AdvancedSearchRequestDTO;
import com.paf.helpdesk.dto.ResourceRequestDTO;
import com.paf.helpdesk.dto.ResourceResponseDTO;
import com.paf.helpdesk.dto.SearchSuggestionDTO;
import com.paf.helpdesk.entity.Resource;
import com.paf.helpdesk.entity.ResourceStatus;
import com.paf.helpdesk.entity.ResourceType;
import com.paf.helpdesk.exception.InvalidTimeRangeException;
import com.paf.helpdesk.exception.ResourceNotFoundException;
import com.paf.helpdesk.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResourceService {

    private final ResourceRepository resourceRepository;

    public List<ResourceResponseDTO> getAllResources() {
        return resourceRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public ResourceResponseDTO getResourceById(Long id) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return mapToResponseDTO(resource);
    }

    public ResourceResponseDTO createResource(ResourceRequestDTO dto) {
        validateTimeRange(dto);
        Resource resource = mapToEntity(dto);
        Resource saved = resourceRepository.save(resource);
        return mapToResponseDTO(saved);
    }

    public ResourceResponseDTO updateResource(Long id, ResourceRequestDTO dto) {
        Resource existing = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        validateTimeRange(dto);

        existing.setName(dto.getName());
        existing.setType(dto.getType());
        existing.setCapacity(dto.getCapacity());
        existing.setLocation(dto.getLocation());
        existing.setAvailableStartTime(dto.getAvailableStartTime());
        existing.setAvailableEndTime(dto.getAvailableEndTime());
        existing.setStatus(dto.getStatus());
        existing.setDescription(dto.getDescription());

        Resource updated = resourceRepository.save(existing);
        return mapToResponseDTO(updated);
    }

    public void deleteResource(Long id) {
        if (!resourceRepository.existsById(id)) {
            throw new ResourceNotFoundException(id);
        }
        resourceRepository.deleteById(id);
    }

    public List<ResourceResponseDTO> searchResources(String name, ResourceType type,
                                                      ResourceStatus status, Integer minCapacity) {
        return resourceRepository.searchResources(name, type, status, minCapacity)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public List<ResourceResponseDTO> advancedSearch(AdvancedSearchRequestDTO searchRequest) {
        List<Resource> resources;

        // Use multi-filter search if multiple types, statuses, or locations are specified
        if ((searchRequest.getTypes() != null && !searchRequest.getTypes().isEmpty()) ||
            (searchRequest.getStatuses() != null && !searchRequest.getStatuses().isEmpty()) ||
            (searchRequest.getLocations() != null && !searchRequest.getLocations().isEmpty())) {
            
            resources = resourceRepository.multiFilterSearch(
                searchRequest.getTypes(),
                searchRequest.getStatuses(),
                searchRequest.getLocations()
            );
        } else {
            // Use advanced search with individual filters
            resources = resourceRepository.advancedSearch(
                searchRequest.getName(),
                searchRequest.getType(),
                searchRequest.getStatus(),
                searchRequest.getLocation(),
                searchRequest.getMinCapacity(),
                searchRequest.getMaxCapacity(),
                searchRequest.getAvailableFrom(),
                searchRequest.getAvailableTo()
            );
        }

        // Apply additional filtering for complex conditions
        if (searchRequest.getTimeOfDay() != null) {
            resources = resources.stream()
                .filter(resource -> isAvailableDuringTimeOfDay(resource, searchRequest.getTimeOfDay()))
                .collect(Collectors.toList());
        }

        return resources.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public List<SearchSuggestionDTO> getSearchSuggestions(String query) {
        SmartSearchService smartSearchService = new SmartSearchService(resourceRepository);
        return smartSearchService.getSearchSuggestions(query);
    }

    private boolean isAvailableDuringTimeOfDay(Resource resource, String timeOfDay) {
        if (resource.getAvailableStartTime() == null || resource.getAvailableEndTime() == null) {
            return true;
        }

        int startHour = resource.getAvailableStartTime().getHour();
        int endHour = resource.getAvailableEndTime().getHour();

        switch (timeOfDay.toLowerCase()) {
            case "morning":
                return startHour <= 12 && endHour >= 6;
            case "afternoon":
                return startHour <= 18 && endHour >= 12;
            case "evening":
                return startHour <= 22 && endHour >= 18;
            case "night":
                return (startHour <= 23 && endHour >= 22) || (startHour <= 6 && endHour >= 0);
            default:
                return true;
        }
    }

    private void validateTimeRange(ResourceRequestDTO dto) {
        if (dto.getAvailableStartTime() != null && dto.getAvailableEndTime() != null) {
            if (!dto.getAvailableEndTime().isAfter(dto.getAvailableStartTime())) {
                throw new InvalidTimeRangeException("End time must be after start time");
            }
        }
    }

    private Resource mapToEntity(ResourceRequestDTO dto) {
        return Resource.builder()
                .name(dto.getName())
                .type(dto.getType())
                .capacity(dto.getCapacity())
                .location(dto.getLocation())
                .availableStartTime(dto.getAvailableStartTime())
                .availableEndTime(dto.getAvailableEndTime())
                .status(dto.getStatus())
                .description(dto.getDescription())
                .build();
    }

    private ResourceResponseDTO mapToResponseDTO(Resource resource) {
        return ResourceResponseDTO.builder()
                .id(resource.getId())
                .name(resource.getName())
                .type(resource.getType())
                .capacity(resource.getCapacity())
                .location(resource.getLocation())
                .availableStartTime(resource.getAvailableStartTime())
                .availableEndTime(resource.getAvailableEndTime())
                .status(resource.getStatus())
                .description(resource.getDescription())
                .createdAt(resource.getCreatedAt())
                .updatedAt(resource.getUpdatedAt())
                .build();
    }
}
