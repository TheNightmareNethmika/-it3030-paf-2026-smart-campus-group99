package com.paf.helpdesk.controller;

import com.paf.helpdesk.dto.AdvancedSearchRequestDTO;
import com.paf.helpdesk.dto.ResourceRequestDTO;
import com.paf.helpdesk.dto.ResourceResponseDTO;
import com.paf.helpdesk.dto.SearchSuggestionDTO;
import com.paf.helpdesk.entity.ResourceStatus;
import com.paf.helpdesk.entity.ResourceType;
import com.paf.helpdesk.service.ResourceService;
import com.paf.helpdesk.service.SmartSearchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ResourceController {

    private final ResourceService resourceService;
    private final SmartSearchService smartSearchService;

    @GetMapping
    public ResponseEntity<List<ResourceResponseDTO>> getAllResources(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) ResourceType type,
            @RequestParam(required = false) ResourceStatus status,
            @RequestParam(required = false) Integer minCapacity) {

        if (name != null || type != null || status != null || minCapacity != null) {
            return ResponseEntity.ok(resourceService.searchResources(name, type, status, minCapacity));
        }
        return ResponseEntity.ok(resourceService.getAllResources());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResourceResponseDTO> getResourceById(@PathVariable Long id) {
        return ResponseEntity.ok(resourceService.getResourceById(id));
    }

    @PostMapping
    public ResponseEntity<ResourceResponseDTO> createResource(@Valid @RequestBody ResourceRequestDTO dto) {
        ResourceResponseDTO created = resourceService.createResource(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResourceResponseDTO> updateResource(
            @PathVariable Long id,
            @Valid @RequestBody ResourceRequestDTO dto) {
        return ResponseEntity.ok(resourceService.updateResource(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.ok(Map.of("message", "Resource deleted successfully"));
    }

    // Advanced Search Endpoints
    @PostMapping("/search/advanced")
    public ResponseEntity<List<ResourceResponseDTO>> advancedSearch(@Valid @RequestBody AdvancedSearchRequestDTO searchRequest) {
        // Parse natural language query if provided
        if (searchRequest.getQuery() != null && !searchRequest.getQuery().trim().isEmpty()) {
            AdvancedSearchRequestDTO parsedRequest = smartSearchService.parseNaturalLanguageQuery(searchRequest.getQuery());
            // Merge parsed request with original request
            if (searchRequest.getName() == null) searchRequest.setName(parsedRequest.getName());
            if (searchRequest.getType() == null) searchRequest.setType(parsedRequest.getType());
            if (searchRequest.getStatus() == null) searchRequest.setStatus(parsedRequest.getStatus());
            if (searchRequest.getLocation() == null) searchRequest.setLocation(parsedRequest.getLocation());
            if (searchRequest.getMinCapacity() == null) searchRequest.setMinCapacity(parsedRequest.getMinCapacity());
            if (searchRequest.getMaxCapacity() == null) searchRequest.setMaxCapacity(parsedRequest.getMaxCapacity());
            if (searchRequest.getAvailableFrom() == null) searchRequest.setAvailableFrom(parsedRequest.getAvailableFrom());
            if (searchRequest.getAvailableTo() == null) searchRequest.setAvailableTo(parsedRequest.getAvailableTo());
            if (searchRequest.getTimeOfDay() == null) searchRequest.setTimeOfDay(parsedRequest.getTimeOfDay());
        }

        List<ResourceResponseDTO> results = resourceService.advancedSearch(searchRequest);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/search/suggestions")
    public ResponseEntity<List<SearchSuggestionDTO>> getSearchSuggestions(@RequestParam String query) {
        List<SearchSuggestionDTO> suggestions = resourceService.getSearchSuggestions(query);
        return ResponseEntity.ok(suggestions);
    }

    @GetMapping("/search/parse")
    public ResponseEntity<AdvancedSearchRequestDTO> parseQuery(@RequestParam String query) {
        AdvancedSearchRequestDTO parsedRequest = smartSearchService.parseNaturalLanguageQuery(query);
        return ResponseEntity.ok(parsedRequest);
    }
}
