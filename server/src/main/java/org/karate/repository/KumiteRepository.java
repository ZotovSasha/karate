package org.karate.repository;

import org.karate.entity.Kumite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KumiteRepository extends JpaRepository<Kumite, Integer> {
}