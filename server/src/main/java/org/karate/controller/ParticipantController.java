package org.karate.controller;

import org.karate.entity.Participant;
import org.karate.entity.ParticipantCategory;
import org.karate.repository.ParticipantCategoryRepository;
import org.karate.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participants")
public class ParticipantController {
    @Autowired
    private ParticipantRepository participantRepository;

    // Добавьте репозиторий для категорий участников
    @Autowired
    private ParticipantCategoryRepository participantCategoryRepository;

    @GetMapping
    public List<Participant> getAllParticipants() {
        return participantRepository.findAll();
    }

    @GetMapping("/filter")
    public List<Participant> getParticipantsByCategory(
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) String search) {

        if (categoryId != null) {
            return participantRepository.findByCategoryId(categoryId);
        }
        if (search != null && !search.isEmpty()) {
            return participantRepository.findByLastNameContainingIgnoreCase(search);
        }
        return participantRepository.findAll();
    }

    @GetMapping("/categories")
    public List<ParticipantCategory> getAllCategories() {
        return participantCategoryRepository.findAll();
    }

    @PostMapping
    public Participant createParticipant(@RequestBody Participant participant) {
        return participantRepository.save(participant);
    }

    @PutMapping("/{id}")
    public Participant updateParticipant(@PathVariable Integer id, @RequestBody Participant participant) {
        participant.setId(id);
        return participantRepository.save(participant);
    }

    @DeleteMapping("/{id}")
    public void deleteParticipant(@PathVariable Integer id) {
        participantRepository.deleteById(id);
    }
}