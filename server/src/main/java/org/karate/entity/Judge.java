package org.karate.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "judges")
public class Judge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idJudge;

    private String lastName;
    private String firstName;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private JudgingTeam team;

}