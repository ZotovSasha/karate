package org.karate.controller;

import org.karate.entity.Secretariat;
import org.karate.repository.SecretariatRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/secretariat")
@CrossOrigin
public class SecretariatController {
    private final SecretariatRepository repository;

    public SecretariatController(SecretariatRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Secretariat> getAll() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Secretariat create(@RequestBody Secretariat secretariat) {
        return repository.save(secretariat);
    }

    @PutMapping("/{id}")
    public Secretariat update(@PathVariable Integer id, @RequestBody Secretariat secretariat) {
        secretariat.setId(id);
        return repository.save(secretariat);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}