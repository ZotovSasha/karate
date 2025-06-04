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
    private ParticipantCategoryRepository participantCategoryRepository;

    @Autowired
    private ParticipantKumiteRepository participantKumiteRepository;

    @Transactional
    public Kumite createKumiteWithParticipants(KumiteDTO kumiteDTO) {
        // 1) Создаём новый Kumite
        Kumite kumite = new Kumite();
        kumite.setTatami(
            tatamiRepository.findById(kumiteDTO.getTatamiId())
                .orElseThrow(() -> new EntityNotFoundException(
                    "Tatami not found с id = " + kumiteDTO.getTatamiId()))
        );
        kumite.setTeam(
            judgingTeamRepository.findById(kumiteDTO.getTeamId())
                .orElseThrow(() -> new EntityNotFoundException(
                    "JudgingTeam не найден с id = " + kumiteDTO.getTeamId()))
        );
        kumite.setWinner(kumiteDTO.getWinner());

        // Сохраняем, чтобы получить ID
        Kumite savedKumite = kumiteRepository.save(kumite);

        // 2) Обрабатываем участников
        for (ParticipantDTO partDto : kumiteDTO.getParticipants()) {
            Participant participantEntity;

            // Если передан существующий participantId
            if (partDto.getParticipantId() != null && partDto.getParticipantId() != 0) {
                participantEntity = participantRepository.findById(partDto.getParticipantId())
                    .orElseThrow(() -> new EntityNotFoundException(
                        "Participant не найден с id = " + partDto.getParticipantId()));
            }
            // Иначе — создаём нового
            else {
                if (partDto.getFirstName() == null
                    || partDto.getLastName() == null
                    || partDto.getPersonalCode() == null
                    || partDto.getCategoryId() == null) {
                    throw new IllegalArgumentException(
                        "Для нового участника необходимо указать firstName, lastName, personalCode и categoryId");
                }

                Participant newPart = new Participant();
                newPart.setFirstName(partDto.getFirstName());
                newPart.setLastName(partDto.getLastName());
                newPart.setPersonalCode(partDto.getPersonalCode());

                ParticipantCategory category = participantCategoryRepository.findById(partDto.getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException(
                        "Категория не найдена с id = " + partDto.getCategoryId()));
                newPart.setCategory(category);

                participantEntity = participantRepository.save(newPart);
            }

            // 3) Создаём связь ParticipantKumite
            ParticipantKumiteId pkId = new ParticipantKumiteId(
                participantEntity.getId(), savedKumite.getId());
            ParticipantKumite pk = new ParticipantKumite();
            pk.setId(pkId);
            pk.setParticipant(participantEntity);
            pk.setKumite(savedKumite);
            pk.setSide(partDto.getSide());

            participantKumiteRepository.save(pk);
        }

        // 4) Возвращаем объект с уже загруженными ассоциациями
        return kumiteRepository.findByIdWithParticipants(savedKumite.getId())
            .orElse(savedKumite);
    }

    @Transactional
    public Kumite updateKumiteWithParticipants(Integer id, KumiteDTO kumiteDTO) {
        // 1) Ищем существующий Kumite
        Kumite existing = kumiteRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                "Kumite не найден с id = " + id));

        // 2) Обновляем простые поля
        existing.setTatami(
            tatamiRepository.findById(kumiteDTO.getTatamiId())
                .orElseThrow(() -> new EntityNotFoundException(
                    "Tatami не найден с id = " + kumiteDTO.getTatamiId()))
        );
        existing.setTeam(
            judgingTeamRepository.findById(kumiteDTO.getTeamId())
                .orElseThrow(() -> new EntityNotFoundException(
                    "JudgingTeam не найден с id = " + kumiteDTO.getTeamId()))
        );
        existing.setWinner(kumiteDTO.getWinner());

        // 3) Удаляем все старые связи с ParticipantKumite
        participantKumiteRepository.deleteByKumiteId(existing.getId());

        // 4) Создаём заново связи, точно так же, как при создании
        for (ParticipantDTO partDto : kumiteDTO.getParticipants()) {
            Participant participantEntity;

            if (partDto.getParticipantId() != null && partDto.getParticipantId() != 0) {
                participantEntity = participantRepository.findById(partDto.getParticipantId())
                    .orElseThrow(() -> new EntityNotFoundException(
                        "Participant не найден с id = " + partDto.getParticipantId()));
            } else {
                if (partDto.getFirstName() == null
                    || partDto.getLastName() == null
                    || partDto.getPersonalCode() == null
                    || partDto.getCategoryId() == null) {
                    throw new IllegalArgumentException(
                        "Для нового участника необходимо указать firstName, lastName, personalCode и categoryId");
                }

                Participant newPart = new Participant();
                newPart.setFirstName(partDto.getFirstName());
                newPart.setLastName(partDto.getLastName());
                newPart.setPersonalCode(partDto.getPersonalCode());

                ParticipantCategory category = participantCategoryRepository.findById(partDto.getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException(
                        "Категория не найдена с id = " + partDto.getCategoryId()));
                newPart.setCategory(category);

                participantEntity = participantRepository.save(newPart);
            }

            ParticipantKumiteId pkId = new ParticipantKumiteId(
                participantEntity.getId(), existing.getId());
            ParticipantKumite pk = new ParticipantKumite();
            pk.setId(pkId);
            pk.setParticipant(participantEntity);
            pk.setKumite(existing);
            pk.setSide(partDto.getSide());

            participantKumiteRepository.save(pk);
        }

        // 5) Сохраняем обновлённый Kumite
        kumiteRepository.save(existing);

        return kumiteRepository.findByIdWithParticipants(existing.getId())
            .orElse(existing);
    }

    @Transactional
    public void deleteKumiteAndParticipants(Integer id) {
        Kumite kumite = kumiteRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Kumite not found с id = " + id));

        // Сначала удаляем все связи с участниками
        participantKumiteRepository.deleteByKumiteId(id);

        // Затем удаляем сам бой
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
