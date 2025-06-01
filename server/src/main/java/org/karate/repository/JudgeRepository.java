package org.karate.repository;

import org.karate.entity.Judge;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JudgeRepository extends JpaRepository<Judge, Integer> {
}