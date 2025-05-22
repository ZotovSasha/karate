package org.karate.repository;

import org.karate.entity.Judge;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JudgeRepository extends JpaRepository<Judge, Integer> {

    // Находит судей по категории
    List<Judge> findByJudgeCategory(String category);

    // Находит судей по команде
    List<Judge> findByJudgingTeam_Id(Integer teamId);
}