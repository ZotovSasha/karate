package org.karate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "secretariat_judges")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SecretariatJudges {
    @Id
    @Column(name = "id_secretariat_judges")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_secretariat")
    private Secretariat secretariat;

    @ManyToOne
    @JoinColumn(name = "id_judging_team")
    private JudgingTeam judgingTeam;
}