package org.karate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Judge {
    @Id
    private Integer id;

    private String lastName;
    private String firstName;
    private String judgeCategory;

    @ManyToOne
    @JoinColumn(name = "fk_id_judging_team")
    private JudgingTeam judgingTeam;
}