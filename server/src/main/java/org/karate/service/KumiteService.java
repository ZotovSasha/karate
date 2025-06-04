package org.karate.service;

import jakarta.persistence.EntityNotFoundException;
import org.karate.dto.KumiteDTO;
import org.karate.entity.Kumite;
import org.karate.entity.Tatami;
import org.karate.entity.JudgingTeam;
import org.karate.repository.KumiteRepository;
import org.karate.repository.ParticipantCategoryRepository;
import org.karate.repository.ParticipantKumiteRepository;
import org.karate.repository.ParticipantRepository;
import org.karate.repository.TatamiRepository;
import org.karate.repository.JudgingTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class KumiteService {

    @Autowired
    private KumiteRepository kumiteRepository;

    @Autowired
    private TatamiRepository tatamiRepository;

    @Autowired
    private JudgingTeamRepository judgingTeamRepository;

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private ParticipantCategoryRepository participantCategoryRepository;

    @Autowired
    private ParticipantKumiteRepository participantKumiteRepository;

    @Transactional
    public Kumite createKumiteWithParticipants(KumiteDTO kumiteDTO) {
        Kumite kumite = new Kumite();
        Tatami tatami = tatamiRepository.findById(kumiteDTO.getTatamiId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Tatami не найден с id = " + kumiteDTO.getTatamiId()));
        kumite.setTatami(tatami);

        JudgingTeam team = judgingTeamRepository.findById(kumiteDTO.getTeamId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "JudgingTeam не найден с id = " + kumiteDTO.getTeamId()));
        kumite.setTeam(team);

        kumite.setWinner(kumiteDTO.getWinner());

        Kumite savedKumite = kumiteRepository.save(kumite);

        return kumiteRepository
                .findByIdWithParticipants(savedKumite.getId())
                .orElse(savedKumite);
    }

    @Transactional
    public Kumite updateKumiteWithParticipants(Integer id, KumiteDTO kumiteDTO) {
        Kumite existing = kumiteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Kumite не найден с id = " + id));

        Tatami tatami = tatamiRepository.findById(kumiteDTO.getTatamiId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Tatami не найден с id = " + kumiteDTO.getTatamiId()));
        existing.setTatami(tatami);

        JudgingTeam team = judgingTeamRepository.findById(kumiteDTO.getTeamId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "JudgingTeam не найден с id = " + kumiteDTO.getTeamId()));
        existing.setTeam(team);

        existing.setWinner(kumiteDTO.getWinner());

        kumiteRepository.save(existing);

        return kumiteRepository
                .findByIdWithParticipants(existing.getId())
                .orElse(existing);
    }

    @Transactional
    public void deleteKumiteAndParticipants(Integer id) {
        Kumite kumite = kumiteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Kumite не найден с id = " + id));

        // Сначала удаляем связи с участниками
        participantKumiteRepository.deleteByKumiteId(id);

        // Затем удаляем сам Kumite
        kumiteRepository.delete(kumite);
    }

    @Transactional(readOnly = true)
    public List<Kumite> getAllKumitesWithParticipants() {
        return kumiteRepository.findAllWithParticipants();
    }

    @Transactional(readOnly = true)
    public Optional<Kumite> getKumiteById(Integer id) {
        return kumiteRepository.findByIdWithParticipants(id);
    }
}
