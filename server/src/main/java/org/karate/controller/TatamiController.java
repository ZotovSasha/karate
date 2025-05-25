package org.karate.controller;

import org.karate.dto.TatamiFightDTO;
import org.karate.entity.Tatami;
import org.karate.repository.TatamiRepository;
import org.karate.service.TatamiService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tatami")
@CrossOrigin
public class TatamiController {
    private final TatamiService service;
    private final TatamiRepository tatamiRepository; // Добавьте репозиторий

    public TatamiController(TatamiService service, TatamiRepository tatamiRepository) {
        this.service = service;
        this.tatamiRepository = tatamiRepository;
    }

    @GetMapping
    public List<Tatami> getAll() {
        return tatamiRepository.findAll();
    }

    @GetMapping("/{tatamiId}/fights")
    public List<TatamiFightDTO> getFights(@PathVariable String tatamiId) {
        return service.getFightsByTatami(tatamiId);
    }
}