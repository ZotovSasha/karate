package org.karate.controller;

import org.karate.dto.KumiteDTO;
import org.karate.entity.Kumite;
import org.karate.repository.KumiteRepository;
import org.karate.service.KumiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kumites")
public class KumiteController {
    @Autowired
    private KumiteRepository kumiteRepository;

    @Autowired
    private KumiteService kumiteService;

    @GetMapping
    public ResponseEntity<List<Kumite>> getAllKumites(@RequestParam(required = false) String full) {
        List<Kumite> kumites;
        if ("true".equals(full)) {
            kumites = kumiteService.getAllKumitesWithParticipants();
        } else {
            kumites = kumiteRepository.findAll();
        }
        return ResponseEntity.ok(kumites);
    }

    @PostMapping
    public ResponseEntity<Kumite> createKumite(@RequestBody KumiteDTO kumiteDTO) {
        try {
            Kumite created = kumiteService.createKumiteWithParticipants(kumiteDTO);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Kumite> updateKumite(@PathVariable Integer id,
                                               @RequestBody KumiteDTO kumiteDTO) {
        try {
            Kumite updated = kumiteService.updateKumiteWithParticipants(id, kumiteDTO);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Kumite> getKumiteById(@PathVariable Integer id) {
        return kumiteService.getKumiteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/delete-with-participants")
    public ResponseEntity<Void> deleteKumiteAndParticipants(@PathVariable Integer id) {
        try {
            kumiteService.deleteKumiteAndParticipants(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}