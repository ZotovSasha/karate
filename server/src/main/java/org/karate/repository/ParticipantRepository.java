package org.karate.repository;

import org.karate.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ParticipantRepository extends JpaRepository<Participant, Integer> {

    // Находит участников по региону
    List<Participant> findByRegion(String region);

    // Находит участников по категории
    List<Participant> findByCategory_Id(Integer categoryId);

    // Кастомный запрос для поиска по имени и фамилии
    @Query("SELECT p FROM Participant p WHERE p.firstName LIKE %:name% OR p.lastName LIKE %:name%")
    List<Participant> findByNameContaining(@Param("name") String name);
}