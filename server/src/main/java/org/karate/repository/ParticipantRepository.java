package org.karate.repository;

import org.karate.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
    @Query("SELECT DISTINCT p FROM Participant p LEFT JOIN p.category c " +
            "WHERE (c.id = :categoryId OR :categoryId IS NULL) " +
            "AND (LOWER(p.lastName) LIKE %:search% OR :search IS NULL)")
    List<Participant> findWithFilters(
            @Param("categoryId") Integer categoryId,
            @Param("search") String search);
}