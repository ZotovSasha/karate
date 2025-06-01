package org.karate.repository;

import org.karate.entity.ParticipantKumite;
import org.karate.entity.ParticipantKumiteId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantKumiteRepository extends JpaRepository<ParticipantKumite, ParticipantKumiteId> {
}