package org.karate.controller;

import org.karate.entity.Kumite;
import org.karate.repository.KumiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kumites")
public class KumiteController {
    @Autowired
    private KumiteRepository kumiteRepository;

    @GetMapping
    public List<Kumite> getAllKumites() {
        return kumiteRepository.findAll();
    }

    @PostMapping
    public Kumite createKumite(@RequestBody Kumite kumite) {
        return kumiteRepository.save(kumite);
    }

    @PutMapping("/{id}")
    public Kumite updateKumite(@PathVariable Integer id, @RequestBody Kumite kumite) {
        kumite.setIdKumite(id);
        return kumiteRepository.save(kumite);
    }
}