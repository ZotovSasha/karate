package org.karate.controller;

import org.karate.entity.ParticipantCategory;
import org.karate.repository.ParticipantCategoryRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin
public class CategoryController {
    private final ParticipantCategoryRepository repository;

    public CategoryController(ParticipantCategoryRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/{id}")
    public ParticipantCategory getById(@PathVariable Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @GetMapping("/filter")
    public List<ParticipantCategory> filter(
            @RequestParam String age,
            @RequestParam String gender) {
        return repository.findByAgeAndGender(age, gender);
    }

    public ParticipantCategory getCategoryById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @GetMapping
    public List<ParticipantCategory> getAll() {
        return repository.findAll();
    }
}