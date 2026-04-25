package com.paf.helpdesk.repository;

import com.paf.helpdesk.entity.Resource;
import com.paf.helpdesk.entity.ResourceStatus;
import com.paf.helpdesk.entity.ResourceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {

    @Query("SELECT r FROM Resource r WHERE " +
           "(:name IS NULL OR LOWER(r.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:type IS NULL OR r.type = :type) AND " +
           "(:status IS NULL OR r.status = :status) AND " +
           "(:minCapacity IS NULL OR r.capacity >= :minCapacity)")
    List<Resource> searchResources(
            @Param("name") String name,
            @Param("type") ResourceType type,
            @Param("status") ResourceStatus status,
            @Param("minCapacity") Integer minCapacity
    );

    // Advanced search with multiple filters
    @Query("SELECT r FROM Resource r WHERE " +
           "(:name IS NULL OR LOWER(r.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:type IS NULL OR r.type = :type) AND " +
           "(:status IS NULL OR r.status = :status) AND " +
           "(:location IS NULL OR LOWER(r.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:minCapacity IS NULL OR r.capacity >= :minCapacity) AND " +
           "(:maxCapacity IS NULL OR r.capacity <= :maxCapacity) AND " +
           "(:availableFrom IS NULL OR :availableTo IS NULL OR " +
           " (r.availableStartTime <= :availableTo AND r.availableEndTime >= :availableFrom))")
    List<Resource> advancedSearch(
            @Param("name") String name,
            @Param("type") ResourceType type,
            @Param("status") ResourceStatus status,
            @Param("location") String location,
            @Param("minCapacity") Integer minCapacity,
            @Param("maxCapacity") Integer maxCapacity,
            @Param("availableFrom") LocalDateTime availableFrom,
            @Param("availableTo") LocalDateTime availableTo
    );

    // Multi-select filters
    @Query("SELECT r FROM Resource r WHERE " +
           "(:types IS NULL OR r.type IN :types) AND " +
           "(:statuses IS NULL OR r.status IN :statuses) AND " +
           "(:locations IS NULL OR LOWER(r.location) IN :locations)")
    List<Resource> multiFilterSearch(
            @Param("types") List<ResourceType> types,
            @Param("statuses") List<ResourceStatus> statuses,
            @Param("locations") List<String> locations
    );

    // Suggestions queries
    @Query("SELECT DISTINCT r.name FROM Resource r WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<String> findDistinctNamesContaining(@Param("query") String query);

    @Query("SELECT DISTINCT r.location FROM Resource r")
    List<String> findDistinctLocations();

    @Query("SELECT COUNT(r) FROM Resource r WHERE r.type = :type")
    long countByType(@Param("type") ResourceType type);

    @Query("SELECT COUNT(r) FROM Resource r WHERE LOWER(r.location) = LOWER(:location)")
    long countByLocation(@Param("location") String location);
}
