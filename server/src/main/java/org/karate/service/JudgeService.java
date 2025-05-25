package org.karate.service;

import org.karate.entity.Kumite;
import org.karate.repository.KumiteRepository;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JudgeService {
    private final KumiteRepository kumiteRepository;

    public JudgeService(KumiteRepository kumiteRepository) {
        this.kumiteRepository = kumiteRepository;
    }

    public Map<String, Long> getDecisionsStatistics() {
        return kumiteRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        Kumite::getDecisionJudges,
                        Collectors.counting()
                ));
    }
}