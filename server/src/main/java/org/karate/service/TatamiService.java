package org.karate.service;

import org.karate.dto.TatamiFightDTO;
import org.karate.repository.SecretariatJudgesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TatamiService {
    private final SecretariatJudgesRepository sjRepository;

    public TatamiService(SecretariatJudgesRepository sjRepository) {
        this.sjRepository = sjRepository;    }

    public List<TatamiFightDTO> getFightsByTatami(String tatamiId) {
        return sjRepository.findBySecretariat_Tatami_Id(tatamiId).stream()
                .flatMap(sj -> sj.getJudgingTeam().getJudges().stream()
                        .map(judge -> new TatamiFightDTO(
                                sj.getSecretariat().getTatami().getId(),
                                judge.getLastName() + " " + judge.getFirstName(),
                                sj.getJudgingTeam().getId()
                        )))
                .collect(Collectors.toList());
    }
}