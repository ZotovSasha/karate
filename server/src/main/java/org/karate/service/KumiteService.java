package org.karate.service;

import jakarta.persistence.EntityNotFoundException;
import org.karate.dto.KumiteDTO;
import org.karate.dto.ParticipantDTO;
import org.karate.entity.Kumite;
import org.karate.entity.Participant;
import org.karate.entity.ParticipantCategory;
import org.karate.entity.ParticipantKumite;
import org.karate.entity.ParticipantKumiteId;
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
        // 1. Создаём и сохраняем объект Kumite, чтобы получить его ID
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

        // 2. Обрабатываем каждого участника
        for (ParticipantDTO partDto : kumiteDTO.getParticipants()) {
            Participant participantEntity;

            // Если передан существующий ID
            if (partDto.getParticipantId() != null && partDto.getParticipantId() != 0) {
                Optional<Participant> opt = participantRepository.findById(partDto.getParticipantId());
                if (opt.isEmpty()) {
                    throw new EntityNotFoundException(
                            "Participant не найден с id = " + partDto.getParticipantId());
                }
                participantEntity = opt.get();
            }
            // Иначе создаём нового участника «на лету»
            else {
                // Проверяем обязательные поля для нового участника
                if (partDto.getFirstName() == null
                        || partDto.getLastName() == null
                        || partDto.getPersonalCode() == null
                        || partDto.getCategoryId() == null) {
                    throw new IllegalArgumentException(
                            "Для нового участника необходимо указать firstName, lastName, personalCode и categoryId");
                }

                ParticipantCategory category = participantCategoryRepository.findById(partDto.getCategoryId())
                        .orElseThrow(() -> new EntityNotFoundException(
                                "ParticipantCategory не найден с id = " + partDto.getCategoryId()));

                Participant newPart = new Participant();
                newPart.setFirstName(partDto.getFirstName());
                newPart.setLastName(partDto.getLastName());
                newPart.setPersonalCode(partDto.getPersonalCode());
                newPart.setCategory(category);

                participantEntity = participantRepository.save(newPart);
            }

            // 3. Создаём связь ParticipantKumite и сохраняем её
            ParticipantKumiteId pkId = new ParticipantKumiteId(
                    participantEntity.getId(),
                    savedKumite.getId()
            );
            ParticipantKumite pk = new ParticipantKumite();
            pk.setId(pkId);
            pk.setParticipant(participantEntity);
            pk.setKumite(savedKumite);
            pk.setSide(partDto.getSide());

            participantKumiteRepository.save(pk);
        }

        // 4. Возвращаем kumite вместе с загруженными ассоциациями
        return kumiteRepository
                .findByIdWithParticipants(savedKumite.getId())
                .orElse(savedKumite);
    }

    @Transactional
    public Kumite updateKumiteWithParticipants(Integer id, KumiteDTO kumiteDTO) {
        // 1. Находим существующий Kumite
        Kumite existing = kumiteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Kumite не найден с id = " + id));

        // 2. Обновляем простые поля
        Tatami tatami = tatamiRepository.findById(kumiteDTO.getTatamiId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Tatami не найден с id = " + kumiteDTO.getTatamiId()));
        existing.setTatami(tatami);

        JudgingTeam team = judgingTeamRepository.findById(kumiteDTO.getTeamId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "JudgingTeam не найден с id = " + kumiteDTO.getTeamId()));
        existing.setTeam(team);

        existing.setWinner(kumiteDTO.getWinner());

        // 3. Удаляем все старые связи ParticipantKumite
        participantKumiteRepository.deleteByKumiteId(existing.getId());

        // 4. Снова обрабатываем каждого участника из DTO
        for (ParticipantDTO partDto : kumiteDTO.getParticipants()) {
            Participant participantEntity;

            if (partDto.getParticipantId() != null && partDto.getParticipantId() != 0) {
                Optional<Participant> opt = participantRepository.findById(partDto.getParticipantId());
                if (opt.isEmpty()) {
                    throw new EntityNotFoundException(
                            "Participant не найден с id = " + partDto.getParticipantId());
                }
                participantEntity = opt.get();
            } else {
                if (partDto.getFirstName() == null
                        || partDto.getLastName() == null
                        || partDto.getPersonalCode() == null
                        || partDto.getCategoryId() == null) {
                    throw new IllegalArgumentException(
                            "Для нового участника необходимо указать firstName, lastName, personalCode и categoryId");
                }

                ParticipantCategory category = participantCategoryRepository.findById(partDto.getCategoryId())
                        .orElseThrow(() -> new EntityNotFoundException(
                                "ParticipantCategory не найден с id = " + partDto.getCategoryId()));

                Participant newPart = new Participant();
                newPart.setFirstName(partDto.getFirstName());
                newPart.setLastName(partDto.getLastName());
                newPart.setPersonalCode(partDto.getPersonalCode());
                newPart.setCategory(category);

                participantEntity = participantRepository.save(newPart);
            }

            ParticipantKumiteId pkId = new ParticipantKumiteId(
                    participantEntity.getId(),
                    existing.getId()
            );
            ParticipantKumite pk = new ParticipantKumite();
            pk.setId(pkId);
            pk.setParticipant(participantEntity);
            pk.setKumite(existing);
            pk.setSide(partDto.getSide());

            participantKumiteRepository.save(pk);
        }

        // 5. Сохраняем изменённый Kumite и возвращаем его
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

        participantKumiteRepository.deleteByKumiteId(id);
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
