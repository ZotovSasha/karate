package org.karate.controller;

import org.karate.repository.TatamiRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tatamis")
public class TatamiController {
    private final TatamiRepository tatamiRepository;

    public TatamiController(TatamiRepository tatamiRepository) {
        this.tatamiRepository = tatamiRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllTatamis() {
        return ResponseEntity.ok(tatamiRepository.findAll());
    }
}