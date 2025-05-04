package org.karate.repository;

import org.karate.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
    List<Participant> findByLastNameContainingIgnoreCaseOrFirstNameContainingIgnoreCase(
            String lastNamePart,
            String firstNamePart
    );
}