package org.karate.controller;

import org.karate.entity.Judge;
import org.karate.repository.JudgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/judges")
public class JudgeController {
    @Autowired
    private JudgeRepository judgeRepository;

    @GetMapping
    public List<Judge> getAllJudges() {
        return judgeRepository.findAll();
    }

    @PostMapping
    public Judge createJudge(@RequestBody Judge judge) {
        return judgeRepository.save(judge);
    }

    @PutMapping("/{id}")
    public Judge updateJudge(@PathVariable Integer id, @RequestBody Judge judge) {
        judge.setIdJudge(id);
        return judgeRepository.save(judge);
    }

    @DeleteMapping("/{id}")
    public void deleteJudge(@PathVariable Integer id) {
        judgeRepository.deleteById(id);
    }
}