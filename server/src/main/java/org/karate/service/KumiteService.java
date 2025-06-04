// KumiteService.java
package org.karate.service;

import jakarta.persistence.EntityNotFoundException;
import org.karate.dto.KumiteDTO;
import org.karate.dto.ParticipantDTO;
import org.karate.entity.*;
import org.karate.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    private ParticipantKumiteRepository participantKumiteRepository;

    @Transactional
    public void deleteKumiteAndParticipants(Integer id) {
        Optional<Kumite> kumite = kumiteRepository.findById(id);
        if (!kumite.isPresent()) {
            throw new EntityNotFoundException();
        }
        participantKumiteRepository.deleteByKumiteId(id);
        kumiteRepository.deleteById(id);
    }

    @Transactional
    public Kumite createKumiteWithParticipants(KumiteDTO kumiteDTO) {
        Kumite kumite = new Kumite();
        return saveKumiteWithParticipants(kumite, kumiteDTO);
    }

    @Transactional
    public Kumite updateKumiteWithParticipants(Integer id, KumiteDTO kumiteDTO) {
        Kumite kumite = kumiteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Kumite not found"));
        return saveKumiteWithParticipants(kumite, kumiteDTO);
    }

    private Kumite saveKumiteWithParticipants(Kumite kumite, KumiteDTO kumiteDTO) {
        // Устанавливаем основные данные
        kumite.setTatami(tatamiRepository.findById(kumiteDTO.getTatamiId())
                .orElseThrow(() -> new EntityNotFoundException("Tatami not found")));

        kumite.setTeam(judgingTeamRepository.findById(kumiteDTO.getTeamId())
                .orElseThrow(() -> new EntityNotFoundException("Judging team not found")));

        kumite.setWinner(kumiteDTO.getWinner());

        // Удаляем старых участников
        kumite.getParticipantAssociations().clear();

        for (ParticipantDTO participantDTO : kumiteDTO.getParticipants()) {
            Participant participant = participantRepository.findById(participantDTO.getParticipantId())
                    .orElseThrow(() -> new EntityNotFoundException("Participant not found"));

            ParticipantKumite participantKumite = new ParticipantKumite();
            participantKumite.setId(new ParticipantKumiteId(participant.getId(), kumite.getIdKumite()));
            participantKumite.setParticipant(participant);
            participantKumite.setKumite(kumite); // устанавливаем связь
            participantKumite.setSide(participantDTO.getSide());

            kumite.getParticipantAssociations().add(participantKumite);
        }

        return kumiteRepository.save(kumite);
    }

    @Transactional(readOnly = true)
    public List<Kumite> getAllKumitesWithParticipants() {
        return kumiteRepository.findAllWithParticipants();
    }

    public Optional<Kumite> getKumiteById(Integer id) {
        return kumiteRepository.findByIdWithParticipants(id);
    }
}