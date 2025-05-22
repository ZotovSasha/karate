package org.karate.repository;

import org.karate.entity.JudgingTeam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JudgingTeamRepository extends JpaRepository<JudgingTeam, Integer> {
}