package org.karate.repository;

import org.karate.entity.ParticipantKumite;
import org.karate.entity.ParticipantKumite.ParticipantKumiteId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipantKumiteRepository extends JpaRepository<ParticipantKumite, ParticipantKumiteId> {

    // Находит все бои участника
    List<ParticipantKumite> findByParticipant_Id(Integer participantId);

    // Находит всех участников боя
    List<ParticipantKumite> findByKumite_Id(Integer kumiteId);
}