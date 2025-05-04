package org.karate.controller;

import org.karate.entity.Participant;
import org.karate.repository.ParticipantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

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
    public List<Participant> search(@RequestParam String name) {
        return repository.findByLastNameContainingIgnoreCaseOrFirstNameContainingIgnoreCase(name, name);
    }
}