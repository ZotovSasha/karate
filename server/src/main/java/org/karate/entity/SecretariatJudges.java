package org.karate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SecretariatJudges {
    @Id
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_secretariat")
    private Secretariat secretariat;

    @ManyToOne
    @JoinColumn(name = "id_judging_team")
    private JudgingTeam judgingTeam;

    @OneToMany(mappedBy = "secretariatJudges")
    private List<Kumite> kumites;
}