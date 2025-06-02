package org.karate.controller;

import org.karate.entity.Judge;
import org.karate.entity.JudgingTeam;
import org.karate.repository.JudgeRepository;
import org.karate.repository.JudgingTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/judges")
public class JudgeController {
    @Autowired
    private JudgeRepository judgeRepository;

    @Autowired
    private JudgingTeamRepository judgingTeamRepository;

    @GetMapping
    public List<Judge> getAllJudges() {
        return judgeRepository.findAll();
    }

    @GetMapping("/filter")
    public List<Judge> getJudgesByTeam(
            @RequestParam(required = false) Integer teamId) {

        if (teamId != null) {
            return judgeRepository.findByTeamId(teamId);
        }
        return judgeRepository.findAll();
    }

    @GetMapping("/teams")
    public List<JudgingTeam> getAllJudgingTeams() {
        return judgingTeamRepository.findAll();
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