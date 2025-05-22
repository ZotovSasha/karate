package org.karate.repository;

import org.karate.entity.ParticipantCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ParticipantCategoryRepository extends JpaRepository<ParticipantCategory, Integer> {

    // Фильтрация по возрасту и полу
    List<ParticipantCategory> findByAgeAndGender(String age, String gender);

    // Находит категории по весовой группе
    List<ParticipantCategory> findByWeight(String weight);
}