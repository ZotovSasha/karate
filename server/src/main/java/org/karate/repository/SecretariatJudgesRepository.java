package org.karate.repository;

import org.karate.entity.SecretariatJudges;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SecretariatJudgesRepository extends JpaRepository<SecretariatJudges, Integer> {

    List<SecretariatJudges> findByJudgingTeam_Id(Integer teamId);

    List<SecretariatJudges> findBySecretariat_Id(Integer secretariatId);
}