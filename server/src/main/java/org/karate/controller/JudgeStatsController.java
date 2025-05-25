package org.karate.controller;

import org.karate.service.JudgeService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/judges/stats")
@CrossOrigin
public class JudgeStatsController {
    private final JudgeService service;

    public JudgeStatsController(JudgeService service) {
        this.service = service;
    }

    @GetMapping
    public Map<String, Long> getDecisionsStats() {
        return service.getDecisionsStatistics();
    }
}