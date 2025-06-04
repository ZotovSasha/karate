package org.karate.repository;

import org.karate.entity.ParticipantKumite;
import org.karate.entity.ParticipantKumiteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ParticipantKumiteRepository extends JpaRepository<ParticipantKumite, ParticipantKumiteId> {
    @Modifying
    @Query("DELETE FROM ParticipantKumite pk WHERE pk.participant.id = :participantId")
    void deleteByParticipantId(@Param("participantId") Integer participantId);
    @Modifying
    @Query("DELETE FROM ParticipantKumite p WHERE p.id.kumiteId = :kumiteId")
    void deleteByKumiteId(@Param("kumiteId") Integer kumiteId);
}
