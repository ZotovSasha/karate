package org.karate.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "kumite")
public class Kumite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idKumite;

    @ManyToOne
    @JoinColumn(name = "tatami_id", nullable = false)
    private Tatami tatami;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private JudgingTeam team;

    @Enumerated(EnumType.STRING)
    private Side winner;

}