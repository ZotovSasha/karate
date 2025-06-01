package org.karate.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "participant")
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idParticipant;

    private String lastName;
    private String firstName;
    private String personalCode;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ParticipantCategory category;
}