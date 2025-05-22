package org.karate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Entity
@IdClass(ParticipantKumite.ParticipantKumiteId.class)
@Table(name = "participant_kumite")
public class ParticipantKumite {
    @Id
    @ManyToOne
    @JoinColumn(name = "id_participant")
    private Participant participant;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_kumite")
    private Kumite kumite;

    private String side;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ParticipantKumiteId implements Serializable {
        private Integer participant;
        private Integer kumite;
    }
}