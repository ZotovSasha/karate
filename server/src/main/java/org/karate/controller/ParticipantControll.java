package org.karate.controller;

import org.karate.entity.Participant;
import org.karate.repository.ParticipantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/participants")
@CrossOrigin(origins = "http://localhost:8080")
public class ParticipantControll {
    private final ParticipantRepository repository;

    public ParticipantControll(ParticipantRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Participant> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Participant getById(@PathVariable Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Participant not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Participant create(@RequestBody Participant participant) {
        return repository.save(participant);
    }

    @PutMapping("/{id}")
    public Participant update(@PathVariable Integer id, @RequestBody Participant participant) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Participant not found");
        }
        participant.setId(id);
        return repository.save(participant);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Participant not found");
        }
        repository.deleteById(id);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchParticipants(@RequestParam String query) {
        try {
            ParticipantRepository participantRepository = null;
            List<Participant> result = participantRepository
                    .findByLastNameContainingIgnoreCaseOrFirstNameContainingIgnoreCase(query, query);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of(
                            "message", "Ошибка при выполнении поиска",
                            "error", e.getMessage()
                    ));
        }
    }
}