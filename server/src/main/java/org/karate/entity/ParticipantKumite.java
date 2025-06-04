package org.karate.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

@Setter
@Getter
@Entity
@Table(name = "participant_kumite")
public class ParticipantKumite {
    @EmbeddedId
    private ParticipantKumiteId id;

    @ManyToOne
    @MapsId("participantId")
    @JoinColumn(name = "participant_id")
    @NotFound(action = NotFoundAction.IGNORE)
    private Participant participant;

    @ManyToOne
    @MapsId("kumiteId")
    @JoinColumn(name = "kumite_id", referencedColumnName = "id_kumite")
    @JsonBackReference
    private Kumite kumite;

    @Enumerated(EnumType.STRING)
    private Side side;
}