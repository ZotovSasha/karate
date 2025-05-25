package org.karate.repository;

import org.karate.entity.ParticipantKumite;
import org.karate.entity.ParticipantKumite.ParticipantKumiteId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipantKumiteRepository extends JpaRepository<ParticipantKumite, ParticipantKumiteId> {
    List<ParticipantKumite> findByParticipantId(Integer participantId);
    List<ParticipantKumite> findByKumiteId(Integer kumiteId);
}