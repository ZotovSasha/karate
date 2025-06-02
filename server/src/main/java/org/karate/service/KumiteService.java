package org.karate.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.karate.entity.Kumite;
import org.karate.repository.KumiteRepository;
import org.karate.repository.ParticipantKumiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class KumiteService {

    @Autowired
    private KumiteRepository kumiteRepository;

    @Autowired
    private ParticipantKumiteRepository participantKumiteRepository;

    @Transactional
    public void deleteKumiteAndParticipants(Integer id) {
        Optional<Kumite> kumite = kumiteRepository.findById(id);
        if (!kumite.isPresent()) {
            throw new EntityNotFoundException();
        }
        participantKumiteRepository.deleteByKumiteId(id);
        kumiteRepository.deleteById(id);
    }
}
