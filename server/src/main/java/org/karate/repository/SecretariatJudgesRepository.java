package org.karate.repository;

import org.karate.entity.SecretariatJudges;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SecretariatJudgesRepository extends JpaRepository<SecretariatJudges, Integer> {
    List<SecretariatJudges> findBySecretariat_Tatami_Id(String tatamiId);
}