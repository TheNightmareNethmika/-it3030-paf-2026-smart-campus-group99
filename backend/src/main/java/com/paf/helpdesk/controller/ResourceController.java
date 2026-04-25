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
import java.util.Optional;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ResourceController {

    private final ResourceService resourceService;
    private final SmartSearchService smartSearchService;

    // =========================
    // 1. GET ALL / FILTER
    // =========================
    @GetMapping
    public ResponseEntity<List<ResourceResponseDTO>> getAllResources(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) ResourceType type,
            @RequestParam(required = false) ResourceStatus status,
            @RequestParam(required = false) Integer minCapacity) {

        List<ResourceResponseDTO> result;

        if (name != null || type != null || status != null || minCapacity != null) {
            result = resourceService.searchResources(name, type, status, minCapacity);
        } else {
            result = resourceService.getAllResources();
        }

        return ResponseEntity.ok(result);
    }

    // =========================
    // 2. GET BY ID (FIXED ❌500 FIX)
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<?> getResourceById(@PathVariable Long id) {

        try {
            ResourceResponseDTO resource = resourceService.getResourceById(id);

            if (resource == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Resource not found"));
            }

            return ResponseEntity.ok(resource);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "error", "Internal Server Error",
                            "message", e.getMessage()
                    ));
        }
    }

    // =========================
    // 3. CREATE RESOURCE
    // =========================
    @PostMapping
    public ResponseEntity<?> createResource(@Valid @RequestBody ResourceRequestDTO dto) {
        try {
            ResourceResponseDTO created = resourceService.createResource(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Create failed", "error", e.getMessage()));
        }
    }

    // =========================
    // 4. UPDATE RESOURCE
    // =========================
    @PutMapping("/{id}")
    public ResponseEntity<?> updateResource(
            @PathVariable Long id,
            @Valid @RequestBody ResourceRequestDTO dto) {

        try {
            ResourceResponseDTO updated = resourceService.updateResource(id, dto);
            return ResponseEntity.ok(updated);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Update failed", "error", e.getMessage()));
        }
    }

    // =========================
    // 5. DELETE RESOURCE (FIXED)
    // =========================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResource(@PathVariable Long id) {

        try {
            resourceService.deleteResource(id);

            return ResponseEntity.ok(
                    Map.of("message", "Resource deleted successfully")
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "message", "Delete failed",
                            "error", e.getMessage()
                    ));
        }
    }

    // =========================
    // 6. ADVANCED SEARCH
    // =========================
    @PostMapping("/search/advanced")
    public ResponseEntity<?> advancedSearch(
            @Valid @RequestBody AdvancedSearchRequestDTO searchRequest) {

        try {

            if (searchRequest.getQuery() != null && !searchRequest.getQuery().trim().isEmpty()) {

                AdvancedSearchRequestDTO parsed =
                        smartSearchService.parseNaturalLanguageQuery(searchRequest.getQuery());

                if (parsed != null) {
                    if (searchRequest.getName() == null) searchRequest.setName(parsed.getName());
                    if (searchRequest.getType() == null) searchRequest.setType(parsed.getType());
                    if (searchRequest.getStatus() == null) searchRequest.setStatus(parsed.getStatus());
                    if (searchRequest.getLocation() == null) searchRequest.setLocation(parsed.getLocation());
                    if (searchRequest.getMinCapacity() == null) searchRequest.setMinCapacity(parsed.getMinCapacity());
                    if (searchRequest.getMaxCapacity() == null) searchRequest.setMaxCapacity(parsed.getMaxCapacity());
                    if (searchRequest.getAvailableFrom() == null) searchRequest.setAvailableFrom(parsed.getAvailableFrom());
                    if (searchRequest.getAvailableTo() == null) searchRequest.setAvailableTo(parsed.getAvailableTo());
                    if (searchRequest.getTimeOfDay() == null) searchRequest.setTimeOfDay(parsed.getTimeOfDay());
                }
            }

            List<ResourceResponseDTO> results =
                    resourceService.advancedSearch(searchRequest);

            return ResponseEntity.ok(results);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "error", "Search failed",
                            "message", e.getMessage()
                    ));
        }
    }

    // =========================
    // 7. SEARCH SUGGESTIONS
    // =========================
    @GetMapping("/search/suggestions")
    public ResponseEntity<?> getSearchSuggestions(@RequestParam String query) {
        return ResponseEntity.ok(resourceService.getSearchSuggestions(query));
    }

    // =========================
    // 8. PARSE QUERY
    // =========================
    @GetMapping("/search/parse")
    public ResponseEntity<?> parseQuery(@RequestParam String query) {
        return ResponseEntity.ok(
                smartSearchService.parseNaturalLanguageQuery(query)
        );
    }
}