package org.karate.repository;

import org.karate.entity.Kumite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface KumiteRepository extends JpaRepository<Kumite, Integer> {

    @Transactional
    @Modifying
    @Query("UPDATE Kumite k SET k.decisionJudges = :decision WHERE k.id = :id")
    void updateDecision(@Param("id") Integer id, @Param("decision") String decision);
}