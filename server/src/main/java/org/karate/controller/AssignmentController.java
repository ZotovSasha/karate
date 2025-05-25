package org.karate.controller;

import org.karate.service.AssignmentService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/assign")
@CrossOrigin
public class AssignmentController {
    private final AssignmentService service;

    public AssignmentController(AssignmentService service) {
        this.service = service;
    }

    @PostMapping("/auto")
    public String autoAssign() {
        service.autoAssignJudgesToTatami();
        return "Assignment completed";
    }
}