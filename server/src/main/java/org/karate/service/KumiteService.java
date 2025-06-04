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
        Kumite kumite = kumiteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Kumite not found"));

        // Сначала удаляем связи с участниками
        participantKumiteRepository.deleteByKumiteId(id);

        // Затем удаляем сам бой
        kumiteRepository.delete(kumite);
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

        // Удаляем старые связи с участниками перед обновлением
        participantKumiteRepository.deleteByKumiteId(id);

        return saveKumiteWithParticipants(kumite, kumiteDTO);
    }

    private Kumite saveKumiteWithParticipants(Kumite kumite, KumiteDTO kumiteDTO) {
        // Устанавливаем основные данные
        kumite.setTatami(tatamiRepository.findById(kumiteDTO.getTatamiId())
                .orElseThrow(() -> new EntityNotFoundException("Tatami not found")));

        kumite.setTeam(judgingTeamRepository.findById(kumiteDTO.getTeamId())
                .orElseThrow(() -> new EntityNotFoundException("Judging team not found")));

        kumite.setWinner(kumiteDTO.getWinner());

        // Сохраняем кумите, чтобы получить ID (для новых записей)
        Kumite savedKumite = kumiteRepository.save(kumite);

        // Очищаем коллекцию участников
        if (savedKumite.getParticipantAssociations() != null) {
            savedKumite.getParticipantAssociations().clear();
        }

        // Добавляем новых участников
        for (ParticipantDTO participantDTO : kumiteDTO.getParticipants()) {
            if (participantDTO.getParticipantId() != null && participantDTO.getParticipantId() != 0) {
                Participant participant = participantRepository.findById(participantDTO.getParticipantId())
                        .orElseThrow(() -> new EntityNotFoundException("Participant not found"));

                ParticipantKumite participantKumite = new ParticipantKumite();
                participantKumite.setId(new ParticipantKumiteId(participant.getId(), savedKumite.getId()));
                participantKumite.setParticipant(participant);
                participantKumite.setKumite(savedKumite);
                participantKumite.setSide(participantDTO.getSide());

                // Сохраняем связь
                participantKumiteRepository.save(participantKumite);
            }
        }

        // Возвращаем обновленный объект с участниками
        return kumiteRepository.findByIdWithParticipants(savedKumite.getId())
                .orElse(savedKumite);
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