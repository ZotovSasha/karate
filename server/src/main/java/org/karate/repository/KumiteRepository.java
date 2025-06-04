// KumiteRepository.java
package org.karate.repository;

import org.karate.entity.Kumite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface KumiteRepository extends JpaRepository<Kumite, Integer> {

    @Query("SELECT DISTINCT k FROM Kumite k " +
            "LEFT JOIN FETCH k.participantAssociations pa " + // исправлено
            "LEFT JOIN FETCH pa.participant p " +
            "LEFT JOIN FETCH k.tatami " +
            "LEFT JOIN FETCH k.team t " +
            "LEFT JOIN FETCH t.tatami")
    List<Kumite> findAllWithParticipants();

    @Query("SELECT DISTINCT k FROM Kumite k " +
            "LEFT JOIN FETCH k.participantAssociations pa " + // исправлено
            "LEFT JOIN FETCH pa.participant p " +
            "LEFT JOIN FETCH k.tatami " +
            "LEFT JOIN FETCH k.team " +
            "WHERE k.id = :id")
    Optional<Kumite> findByIdWithParticipants(@Param("id") Integer id);
}