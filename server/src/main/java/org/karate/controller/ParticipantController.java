package org.karate.controller;

import org.karate.entity.Participant;
import org.karate.entity.ParticipantCategory;
import org.karate.repository.ParticipantCategoryRepository;
import org.karate.repository.ParticipantKumiteRepository;
import org.karate.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participants")
public class ParticipantController {
    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private ParticipantCategoryRepository participantCategoryRepository;

    @Autowired
    private ParticipantKumiteRepository participantKumiteRepository;

    @GetMapping
    public List<Participant> getAllParticipants() {
        return participantRepository.findAll();
    }

    @GetMapping("/filter")
    public List<Participant> getParticipantsByCategory(
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) String search) {
        String normalizedSearch = search == null || search.isBlank() ? null : search.toLowerCase();
        return participantRepository.findWithFilters(categoryId, normalizedSearch);
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
        participantKumiteRepository.deleteByParticipantId(id);
        participantRepository.deleteById(id);
    }
}