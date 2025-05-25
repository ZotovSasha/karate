package org.karate.controller;

import org.karate.dto.ParticipantDTO;
import org.karate.entity.Participant;
import org.karate.service.TournamentService;
import org.karate.repository.ParticipantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/participants")
@CrossOrigin(origins = "http://localhost:5173") // Разрешить запросы от Vite-клиента
public class ParticipantController {
    private final ParticipantRepository repository;
    private final TournamentService service;

    public ParticipantController(ParticipantRepository repository, TournamentService service) {
        this.repository = repository;
        this.service = service;
    }

    @GetMapping
    public List<ParticipantDTO> getAll() {
        return repository.findAll().stream()
                .map(ParticipantDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @PostMapping("/generate-bracket/{categoryId}")
    public Map<String, Object> generateBracket(@PathVariable Integer categoryId) {
        return service.generateTournamentBracket(categoryId);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ParticipantDTO create(@RequestBody ParticipantDTO dto) {
        Participant participant = new Participant();
        participant.setFirstName(dto.getFirstName());
        participant.setLastName(dto.getLastName());
        participant.setRegion(dto.getRegion());
        participant.setCategory(service.getCategoryById(dto.getCategoryId()));
        return ParticipantDTO.fromEntity(repository.save(participant));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}