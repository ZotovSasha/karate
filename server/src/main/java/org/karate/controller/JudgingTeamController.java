package org.karate.controller;

import org.karate.entity.JudgingTeam;
import org.karate.repository.JudgingTeamRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/judging-teams")
@CrossOrigin
public class JudgingTeamController {
    private final JudgingTeamRepository repository;

    public JudgingTeamController(JudgingTeamRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<JudgingTeam> getAll() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public JudgingTeam create(@RequestBody JudgingTeam team) {
        return repository.save(team);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}
