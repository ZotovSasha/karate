package org.karate.repository;

import org.karate.entity.ParticipantCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ParticipantCategoryRepository extends JpaRepository<ParticipantCategory, Integer> {
    @Modifying
    @Query("DELETE FROM Participant p WHERE p.category.id = :categoryId")
    void deleteParticipantsByCategoryId(@Param("categoryId") Integer categoryId);
}