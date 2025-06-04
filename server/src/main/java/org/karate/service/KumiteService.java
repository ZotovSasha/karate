package org.karate.service;

import jakarta.persistence.EntityNotFoundException;
import org.karate.dto.KumiteDTO;
import org.karate.dto.ParticipantDTO;
import org.karate.entity.Kumite;
import org.karate.entity.Participant;
import org.karate.entity.ParticipantCategory;
import org.karate.entity.ParticipantKumite;
import org.karate.entity.ParticipantKumiteId;
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

        // Сохраняем Kumite, чтобы получить его ID
        Kumite savedKumite = kumiteRepository.save(kumite);

        // 2) Обрабатываем каждого участника из DTO
        for (ParticipantDTO partDto : kumiteDTO.getParticipants()) {
            // Проверяем, что participantId существует в базе
            if (partDto.getParticipantId() != null && partDto.getParticipantId() != 0) {
                Optional<Participant> opt = participantRepository.findById(partDto.getParticipantId());
                if (opt.isEmpty()) {
                    // Если участник с таким ID не найден, кидаем исключение и не продолжаем вставку
                    throw new EntityNotFoundException(
                        "Participant не найден с id = " + partDto.getParticipantId());
                }
            }

            // После проверки получаем объект Participant
            Participant participantEntity = partDto.getParticipantId() != null && partDto.getParticipantId() != 0
                ? participantRepository.findById(partDto.getParticipantId()).get()
                // Если нужно создавать нового участника «на лету», дополните логику здесь:
                : null; // или: создайте нового Participant, если DTO содержит данные для нового

            // Создаём связь ParticipantKumite (если participantEntity не null)
            if (participantEntity != null) {
                ParticipantKumiteId pkId = new ParticipantKumiteId(
                    participantEntity.getId(), savedKumite.getId());
                ParticipantKumite pk = new ParticipantKumite();
                pk.setId(pkId);
                pk.setParticipant(participantEntity);
                pk.setKumite(savedKumite);
                pk.setSide(partDto.getSide());

                participantKumiteRepository.save(pk);
            }
        }

        // 3) Возвращаем только что сохранённый Kumite вместе с его участниками
        return kumiteRepository
            .findByIdWithParticipants(savedKumite.getId())
            .orElse(savedKumite);
    }

    @Transactional
    public Kumite updateKumiteWithParticipants(Integer id, KumiteDTO kumiteDTO) {
        // 1) Находим существующий Kumite
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

        // 3) Удаляем все старые связи с участниками
        participantKumiteRepository.deleteByKumiteId(existing.getId());

        // 4) Снова обрабатываем каждого участника из DTO
        for (ParticipantDTO partDto : kumiteDTO.getParticipants()) {
            // Проверка на существующий participantId
            if (partDto.getParticipantId() != null && partDto.getParticipantId() != 0) {
                Optional<Participant> opt = participantRepository.findById(partDto.getParticipantId());
                if (opt.isEmpty()) {
                    throw new EntityNotFoundException(
                        "Participant не найден с id = " + partDto.getParticipantId());
                }
            }

            Participant participantEntity = partDto.getParticipantId() != null && partDto.getParticipantId() != 0
                ? participantRepository.findById(partDto.getParticipantId()).get()
                : null; // или логика создания нового участника

            if (participantEntity != null) {
                ParticipantKumiteId pkId = new ParticipantKumiteId(
                    participantEntity.getId(), existing.getId());
                ParticipantKumite pk = new ParticipantKumite();
                pk.setId(pkId);
                pk.setParticipant(participantEntity);
                pk.setKumite(existing);
                pk.setSide(partDto.getSide());

                participantKumiteRepository.save(pk);
            }
        }

        // 5) Сохраняем обновлённый объект
        kumiteRepository.save(existing);

        return kumiteRepository
            .findByIdWithParticipants(existing.getId())
            .orElse(existing);
    }

    @Transactional
    public void deleteKumiteAndParticipants(Integer id) {
        Kumite kumite = kumiteRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(
                "Kumite not found с id = " + id));

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
