package com.paf.helpdesk.dto;

import lombok.Data;
import com.paf.helpdesk.entity.ResourceType;
import com.paf.helpdesk.entity.ResourceStatus;

@Data
public class SearchSuggestionDTO {
    
    private String text;
    private String type; // "name", "location", "type", "status", "query"
    private String value;
    private ResourceType resourceType;
    private ResourceStatus resourceStatus;
    private Integer count; // Number of matching resources
    
    public SearchSuggestionDTO(String text, String type, String value) {
        this.text = text;
        this.type = type;
        this.value = value;
    }
    
    public SearchSuggestionDTO(String text, String type, String value, Integer count) {
        this.text = text;
        this.type = type;
        this.value = value;
        this.count = count;
    }
}
