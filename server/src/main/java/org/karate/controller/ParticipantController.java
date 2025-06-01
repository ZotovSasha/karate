package org.karate.controller;

import org.karate.entity.Participant;
import org.karate.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participants")
public class ParticipantController {
    @Autowired
    private ParticipantRepository participantRepository;

    @GetMapping
    public List<Participant> getAllParticipants() {
        return participantRepository.findAll();
    }

    @PostMapping
    public Participant createParticipant(@RequestBody Participant participant) {
        return participantRepository.save(participant);
    }

    @PutMapping("/{id}")
    public Participant updateParticipant(@PathVariable Integer id, @RequestBody Participant participant) {
        participant.setIdParticipant(id);
        return participantRepository.save(participant);
    }

    @DeleteMapping("/{id}")
    public void deleteParticipant(@PathVariable Integer id) {
        participantRepository.deleteById(id);
    }
}