package org.karate.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "participant_kumite")
public class ParticipantKumite {
    // Геттеры и сеттеры
    @EmbeddedId
    private ParticipantKumiteId id;

    @ManyToOne
    @MapsId("participantId")
    @JoinColumn(name = "participant_id")
    private Participant participant;

    @ManyToOne
    @MapsId("kumiteId")
    @JoinColumn(name = "kumite_id")
    private Kumite kumite;

    @Enumerated(EnumType.STRING)
    private Side side;

}