package org.karate.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Setter
@Getter
@Embeddable
public class ParticipantKumiteId implements Serializable {
    @Column(name = "participant_id")
    private Integer participantId;

    @Column(name = "kumite_id")
    private Integer kumiteId;

    public ParticipantKumiteId() {
    }

    public ParticipantKumiteId(Integer participantId, Integer kumiteId) {
        this.participantId = participantId;
        this.kumiteId = kumiteId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ParticipantKumiteId that = (ParticipantKumiteId) o;
        return Objects.equals(participantId, that.participantId) &&
                Objects.equals(kumiteId, that.kumiteId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(participantId, kumiteId);
    }
}