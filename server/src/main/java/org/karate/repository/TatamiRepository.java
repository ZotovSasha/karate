package org.karate.repository;

import org.karate.entity.Tatami;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TatamiRepository extends JpaRepository<Tatami, String> {
}