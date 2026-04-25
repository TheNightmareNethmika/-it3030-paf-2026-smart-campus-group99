package com.paf.helpdesk.service;

import com.paf.helpdesk.dto.AdvancedSearchRequestDTO;
import com.paf.helpdesk.dto.SearchSuggestionDTO;
import com.paf.helpdesk.entity.ResourceType;
import com.paf.helpdesk.entity.ResourceStatus;
import com.paf.helpdesk.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class SmartSearchService {

    private final ResourceRepository resourceRepository;

    public AdvancedSearchRequestDTO parseNaturalLanguageQuery(String query) {
        AdvancedSearchRequestDTO searchRequest = new AdvancedSearchRequestDTO();
        searchRequest.setQuery(query);

        if (query == null || query.trim().isEmpty()) {
            return searchRequest;
        }

        String lowerQuery = query.toLowerCase();

        // Parse resource types
        for (ResourceType type : ResourceType.values()) {
            if (lowerQuery.contains(type.name().toLowerCase().replace("_", " ")) ||
                lowerQuery.contains(type.name().toLowerCase())) {
                searchRequest.setType(type);
                break;
            }
        }

        // Parse resource status
        for (ResourceStatus status : ResourceStatus.values()) {
            if (lowerQuery.contains(status.name().toLowerCase().replace("_", " ")) ||
                lowerQuery.contains(status.name().toLowerCase())) {
                searchRequest.setStatus(status);
                break;
            }
        }

        // Parse capacity conditions
        Pattern capacityPattern = Pattern.compile("capacity\\s*(>=|>|<=|<|=)\\s*(\\d+)", Pattern.CASE_INSENSITIVE);
        Matcher capacityMatcher = capacityPattern.matcher(lowerQuery);
        if (capacityMatcher.find()) {
            String operator = capacityMatcher.group(1);
            int value = Integer.parseInt(capacityMatcher.group(2));
            
            switch (operator) {
                case ">=":
                    searchRequest.setMinCapacity(value);
                    break;
                case ">":
                    searchRequest.setMinCapacity(value + 1);
                    break;
                case "<=":
                    searchRequest.setMaxCapacity(value);
                    break;
                case "<":
                    searchRequest.setMaxCapacity(value - 1);
                    break;
                case "=":
                    searchRequest.setMinCapacity(value);
                    searchRequest.setMaxCapacity(value);
                    break;
            }
        }

        // Parse simple capacity mentions
        Pattern simpleCapacityPattern = Pattern.compile("capacity\\s*(\\d+)", Pattern.CASE_INSENSITIVE);
        Matcher simpleCapacityMatcher = simpleCapacityPattern.matcher(lowerQuery);
        if (simpleCapacityMatcher.find()) {
            int value = Integer.parseInt(simpleCapacityMatcher.group(1));
            if (searchRequest.getMinCapacity() == null) {
                searchRequest.setMinCapacity(value);
            }
        }

        // Parse location (extract quoted strings or common location keywords)
        Pattern locationPattern = Pattern.compile("\"([^\"]+)\"|(building\\s+[a-z0-9]+|floor\\s+[a-z0-9]+|room\\s+[a-z0-9]+)", Pattern.CASE_INSENSITIVE);
        Matcher locationMatcher = locationPattern.matcher(query);
        if (locationMatcher.find()) {
            String location = locationMatcher.group(1) != null ? locationMatcher.group(1) : locationMatcher.group(2);
            searchRequest.setLocation(location.trim());
        }

        // Parse time of day
        if (lowerQuery.contains("morning")) {
            searchRequest.setTimeOfDay("morning");
            searchRequest.setAvailableFrom(LocalDateTime.now().with(LocalTime.of(6, 0)));
            searchRequest.setAvailableTo(LocalDateTime.now().with(LocalTime.of(12, 0)));
        } else if (lowerQuery.contains("afternoon")) {
            searchRequest.setTimeOfDay("afternoon");
            searchRequest.setAvailableFrom(LocalDateTime.now().with(LocalTime.of(12, 0)));
            searchRequest.setAvailableTo(LocalDateTime.now().with(LocalTime.of(18, 0)));
        } else if (lowerQuery.contains("evening")) {
            searchRequest.setTimeOfDay("evening");
            searchRequest.setAvailableFrom(LocalDateTime.now().with(LocalTime.of(18, 0)));
            searchRequest.setAvailableTo(LocalDateTime.now().with(LocalTime.of(22, 0)));
        } else if (lowerQuery.contains("night")) {
            searchRequest.setTimeOfDay("night");
            searchRequest.setAvailableFrom(LocalDateTime.now().with(LocalTime.of(22, 0)));
            searchRequest.setAvailableTo(LocalDateTime.now().with(LocalTime.of(6, 0)).plusDays(1));
        }

        // Parse day of week
        String[] days = {"monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"};
        for (int i = 0; i < days.length; i++) {
            if (lowerQuery.contains(days[i])) {
                searchRequest.setDayOfWeek(days[i]);
                // Set date to next occurrence of this day
                LocalDateTime now = LocalDateTime.now();
                int currentDay = now.getDayOfWeek().getValue() - 1; // Convert to 0-6 (Monday=0)
                int targetDay = i;
                int daysToAdd = (targetDay - currentDay + 7) % 7;
                if (daysToAdd == 0) daysToAdd = 7; // Next week if today
                
                LocalDateTime targetDate = now.plusDays(daysToAdd);
                searchRequest.setAvailableFrom(targetDate.with(LocalTime.of(0, 0)));
                searchRequest.setAvailableTo(targetDate.with(LocalTime.of(23, 59)));
                break;
            }
        }

        // Parse "tomorrow"
        if (lowerQuery.contains("tomorrow")) {
            LocalDateTime tomorrow = LocalDateTime.now().plusDays(1);
            searchRequest.setAvailableFrom(tomorrow.with(LocalTime.of(0, 0)));
            searchRequest.setAvailableTo(tomorrow.with(LocalTime.of(23, 59)));
        }

        // Parse "today"
        if (lowerQuery.contains("today")) {
            LocalDateTime today = LocalDateTime.now();
            searchRequest.setAvailableFrom(today.with(LocalTime.of(0, 0)));
            searchRequest.setAvailableTo(today.with(LocalTime.of(23, 59)));
        }

        // Extract remaining text as name search
        String nameQuery = query;
        // Remove parsed patterns
        nameQuery = capacityPattern.matcher(nameQuery).replaceAll("");
        nameQuery = locationPattern.matcher(nameQuery).replaceAll("");
        nameQuery = nameQuery.replaceAll("(?i)(morning|afternoon|evening|night|today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday)", "");
        nameQuery = nameQuery.replaceAll("(?i)(capacity|available|building|floor|room)", "");
        nameQuery = nameQuery.replaceAll("[,;]", " ").trim();
        
        if (!nameQuery.trim().isEmpty()) {
            searchRequest.setName(nameQuery.trim());
        }

        return searchRequest;
    }

    public List<SearchSuggestionDTO> getSearchSuggestions(String query) {
        List<SearchSuggestionDTO> suggestions = new ArrayList<>();
        
        if (query == null || query.length() < 2) {
            return suggestions;
        }

        String lowerQuery = query.toLowerCase();

        // Resource type suggestions
        for (ResourceType type : ResourceType.values()) {
            String typeName = type.name().toLowerCase().replace("_", " ");
            if (typeName.contains(lowerQuery)) {
                long count = resourceRepository.countByType(type);
                suggestions.add(new SearchSuggestionDTO(typeName, "type", type.name(), (int) count));
            }
        }

        // Location suggestions
        List<String> locations = resourceRepository.findDistinctLocations();
        for (String location : locations) {
            if (location.toLowerCase().contains(lowerQuery)) {
                long count = resourceRepository.countByLocation(location);
                suggestions.add(new SearchSuggestionDTO(location, "location", location, (int) count));
            }
        }

        // Resource name suggestions
        List<String> names = resourceRepository.findDistinctNamesContaining(query);
        for (String name : names) {
            suggestions.add(new SearchSuggestionDTO(name, "name", name));
        }

        // Common query templates
        if (lowerQuery.contains("lab")) {
            suggestions.add(new SearchSuggestionDTO("Lab, capacity > 30", "query", "Lab, capacity > 30"));
        }
        if (lowerQuery.contains("meeting")) {
            suggestions.add(new SearchSuggestionDTO("Meeting room, available tomorrow", "query", "Meeting room, available tomorrow"));
        }

        return suggestions;
    }
}
