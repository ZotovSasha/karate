package org.karate.repository;

import org.karate.entity.Secretariat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SecretariatRepository extends JpaRepository<Secretariat, Integer> {

    List<Secretariat> findByTatami_Id(String tatamiId);
}