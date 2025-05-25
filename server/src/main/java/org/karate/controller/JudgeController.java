package org.karate.controller;

import org.karate.entity.Judge;
import org.karate.repository.JudgeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/judges")
@CrossOrigin
public class JudgeController {
    private final JudgeRepository repository;

    public JudgeController(JudgeRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Judge> getAll() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Judge create(@RequestBody Judge judge) {
        return repository.save(judge);
    }

    @PutMapping("/{id}")
    public Judge update(@PathVariable Integer id, @RequestBody Judge judge) {
        judge.setId(id);
        return repository.save(judge);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}