package org.karate.repository;

import org.karate.entity.ParticipantCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantCategoryRepository extends JpaRepository<ParticipantCategory, Integer> {
}