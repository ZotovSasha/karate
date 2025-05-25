package org.karate.service;

import org.karate.entity.*;
import org.karate.repository.*;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AssignmentService {
    private final JudgingTeamRepository teamRepository;
    private final SecretariatRepository secretariatRepository;

    public AssignmentService(JudgingTeamRepository teamRepository,
                             SecretariatRepository secretariatRepository) {
        this.teamRepository = teamRepository;
        this.secretariatRepository = secretariatRepository;
    }

    public void autoAssignJudgesToTatami() {
        List<JudgingTeam> teams = teamRepository.findAll();
        List<Secretariat> secretariats = secretariatRepository.findAll();

        secretariats.forEach(secretariat -> {
            Optional<JudgingTeam> freeTeam = teams.stream()
                    .filter(t -> t.getSecretariatJudges() == null)
                    .findFirst();
            freeTeam.ifPresent(team -> {
                SecretariatJudges sj = new SecretariatJudges();
                sj.setSecretariat(secretariat);
                sj.setJudgingTeam(team);
                // Сохранение через репозиторий SecretariatJudgesRepository
            });
        });
    }
}