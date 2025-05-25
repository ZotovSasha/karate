package org.karate.controller;

import org.karate.dto.TatamiFightDTO;
import org.karate.service.TatamiService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tatami")
@CrossOrigin
public class TatamiController {
    private final TatamiService service;

    public TatamiController(TatamiService service) {
        this.service = service;
    }

    @GetMapping("/{tatamiId}/fights")
    public List<TatamiFightDTO> getFights(@PathVariable String tatamiId) {
        return service.getFightsByTatami(tatamiId);
    }
}