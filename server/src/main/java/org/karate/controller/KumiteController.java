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
    public List<Kumite> getAllKumites() {
        return kumiteService.getAllKumitesWithParticipants();
    }

    @PostMapping
    public ResponseEntity<Kumite> createKumite(@RequestBody KumiteDTO kumiteDTO) {
        Kumite created = kumiteService.createKumiteWithParticipants(kumiteDTO);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Kumite> updateKumite(@PathVariable Integer id,
                                               @RequestBody KumiteDTO kumiteDTO) {
        Kumite updated = kumiteService.updateKumiteWithParticipants(id, kumiteDTO);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Kumite> getKumiteById(@PathVariable Integer id) {
        return kumiteService.getKumiteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/delete-with-participants")
    public void deleteKumiteAndParticipants(@PathVariable Integer id) {
        kumiteService.deleteKumiteAndParticipants(id);
    }
}