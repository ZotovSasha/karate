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
    private ParticipantCategoryRepository participantCategoryRepository; // если нужно
    @Autowired
    private ParticipantKumiteRepository participantKumiteRepository;

    @Transactional
    public Kumite createKumiteWithParticipants(KumiteDTO kumiteDTO) {
        // 1. Создаём/загружаем сам бой
        Kumite kumite = new Kumite();
        kumite.setTatami(
            tatamiRepository.findById(kumiteDTO.getTatamiId())
                .orElseThrow(() -> new EntityNotFoundException("Tatami not found с id = " + kumiteDTO.getTatamiId()))
        );
        kumite.setTeam(
            judgingTeamRepository.findById(kumiteDTO.getTeamId())
                .orElseThrow(() -> new EntityNotFoundException("JudgingTeam не найден с id = " + kumiteDTO.getTeamId()))
        );
        kumite.setWinner(kumiteDTO.getWinner());

        // Сохраняем, чтобы получить ID (ID получим после сохранения)
        Kumite savedKumite = kumiteRepository.save(kumite);

        // 2. Обработка участников
        for (ParticipantDTO partDto : kumiteDTO.getParticipants()) {
            Participant participantEntity;

            // 2.1. Если передан существующий participantId (не null и не 0)
            if (partDto.getParticipantId() != null && partDto.getParticipantId() != 0) {
                participantEntity = participantRepository.findById(partDto.getParticipantId())
                    .orElseThrow(() ->
                        new EntityNotFoundException("Participant не найден с id = " + partDto.getParticipantId()));
            }
            // 2.2. Иначе — создаём нового Participant «на лету»
            else {
                // Проверяем, чтобы обязательно пришли все поля для нового участника:
                if (partDto.getFirstName() == null
                    || partDto.getLastName() == null
                    || partDto.getPersonalCode() == null
                    || partDto.getCategoryId() == null) {
                    throw new IllegalArgumentException("Для нового участника необходимо указать firstName, lastName, personalCode и categoryId");
                }

                Participant newPart = new Participant();
                newPart.setFirstName(partDto.getFirstName());
                newPart.setLastName(partDto.getLastName());
                newPart.setPersonalCode(partDto.getPersonalCode());
                // Категория участника:
                ParticipantCategory category = participantCategoryRepository.findById(partDto.getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Категория не найдена с id = " + partDto.getCategoryId()));
                newPart.setCategory(category);

                participantEntity = participantRepository.save(newPart);
            }

            // 3. Создаём связь ParticipantKumite
            ParticipantKumiteId pkId = new ParticipantKumiteId(participantEntity.getId(), savedKumite.getId());
            ParticipantKumite pk = new ParticipantKumite();
            pk.setId(pkId);
            pk.setParticipant(participantEntity);
            pk.setKumite(savedKumite);
            pk.setSide(partDto.getSide());

            participantKumiteRepository.save(pk);
        }

        // 4. При возврате кладём сразу DTO с уже загруженными участниками, если нужно
        return kumiteRepository.findByIdWithParticipants(savedKumite.getId())
            .orElse(savedKumite);
    }

    @Transactional
    public Kumite updateKumiteWithParticipants(Integer id, KumiteDTO kumiteDTO) {
        Kumite existing = kumiteRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Kumite не найден с id = " + id));

        // 1) Обновляем простые поля
        existing.setTatami(
            tatamiRepository.findById(kumiteDTO.getTatamiId())
                .orElseThrow(() -> new EntityNotFoundException("Tatami не найден с id = " + kumiteDTO.getTatamiId()))
        );
        existing.setTeam(
            judgingTeamRepository.findById(kumiteDTO.getTeamId())
                .orElseThrow(() -> new EntityNotFoundException("JudgingTeam не найден с id = " + kumiteDTO.getTeamId()))
        );
        existing.setWinner(kumiteDTO.getWinner());

        // 2) Удаляем старые связи (participantAssociations)
        participantKumiteRepository.deleteByKumiteId(existing.getId());

        // 3) Создаём новые связи точно так же, как при создании
        for (ParticipantDTO partDto : kumiteDTO.getParticipants()) {
            Participant participantEntity;

            if (partDto.getParticipantId() != null && partDto.getParticipantId() != 0) {
                participantEntity = participantRepository.findById(partDto.getParticipantId())
                    .orElseThrow(() ->
                        new EntityNotFoundException("Participant не найден с id = " + partDto.getParticipantId()));
            } else {
                if (partDto.getFirstName() == null
                    || partDto.getLastName() == null
                    || partDto.getPersonalCode() == null
                    || partDto.getCategoryId() == null) {
                    throw new IllegalArgumentException("Для нового участника необходимо указать firstName, lastName, personalCode и categoryId");
                }

                Participant newPart = new Participant();
                newPart.setFirstName(partDto.getFirstName());
                newPart.setLastName(partDto.getLastName());
                newPart.setPersonalCode(partDto.getPersonalCode());
                ParticipantCategory category = participantCategoryRepository.findById(partDto.getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Категория не найдена с id = " + partDto.getCategoryId()));
                newPart.setCategory(category);

                participantEntity = participantRepository.save(newPart);
            }

            ParticipantKumiteId pkId = new ParticipantKumiteId(participantEntity.getId(), existing.getId());
            ParticipantKumite pk = new ParticipantKumite();
            pk.setId(pkId);
            pk.setParticipant(participantEntity);
            pk.setKumite(existing);
            pk.setSide(partDto.getSide());

            participantKumiteRepository.save(pk);
        }

        // 4. Сохраняем обновленный Kumite (в cascade уже не будет дополнительных participantKumite,
        //    поскольку мы создали их вручную через репозиторий)
        kumiteRepository.save(existing);
        return kumiteRepository.findByIdWithParticipants(existing.getId())
            .orElse(existing);
    }

    @Transactional
    public void deleteKumiteAndParticipants(Integer id) {
        Kumite kumite = kumiteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Kumite not found"));

        // Сначала удаляем связи с участниками
        participantKumiteRepository.deleteByKumiteId(id);

        // Затем удаляем сам бой
        kumiteRepository.delete(kumite);
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