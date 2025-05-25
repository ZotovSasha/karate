package org.karate.repository;

import org.karate.entity.ParticipantCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import java.util.List;
import java.util.Optional;

public interface ParticipantCategoryRepository extends JpaRepository<ParticipantCategory, Integer> {

    List<ParticipantCategory> findByAgeAndGender(String age, String gender);

    @Override
    @Nullable
    Optional<ParticipantCategory> findById(@NonNull Integer id);
}