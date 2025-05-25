package org.karate.service;

import org.karate.entity.*;
import org.karate.repository.*;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TournamentService {
    private final ParticipantRepository participantRepository;
    private final KumiteRepository kumiteRepository;
    private final ParticipantCategoryRepository categoryRepository;

    public TournamentService(ParticipantRepository participantRepository,
                             KumiteRepository kumiteRepository, ParticipantCategoryRepository categoryRepository) {
        this.participantRepository = participantRepository;
        this.kumiteRepository = kumiteRepository;
        this.categoryRepository = categoryRepository;
    }

    // Генерация турнирной сетки (уникальный алгоритм)
    public Map<String, Object> generateTournamentBracket(Integer categoryId) {
        List<Participant> participants = participantRepository.findByCategory_Id(categoryId);
        Collections.shuffle(participants); // Рандомизация для честности

        List<Kumite> matches = new ArrayList<>();
        for (int i = 0; i < participants.size(); i += 2) {
            if (i+1 >= participants.size()) break;

            Kumite kumite = new Kumite();
            kumite.setDecisionJudges("pending");
            matches.add(kumiteRepository.save(kumite));

            // Привязка участников
            createParticipantKumite(participants.get(i), kumite, "red");
            createParticipantKumite(participants.get(i+1), kumite, "blue");
        }

        return Map.of(
                "categoryId", categoryId,
                "totalMatches", matches.size(),
                "nextStep", "quarterfinals",
                "generatedAt", new Date()
        );
    }

    public ParticipantCategory getCategoryById(Integer id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    private void createParticipantKumite(Participant p, Kumite k, String side) {
        ParticipantKumite pk = new ParticipantKumite();
        pk.setParticipant(p);
        pk.setKumite(k);
        pk.setSide(side);
        // Сохранение через отдельный репозиторий
    }
}