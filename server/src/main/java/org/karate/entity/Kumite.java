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
public class Kumite {
    @Id
    @Column(name = "id_kumite")
    private Integer id;

    private String decisionJudges;

    @ManyToOne
    @JoinColumn(name = "fk_id_secretariat_judges")
    private SecretariatJudges secretariatJudges;

    @OneToMany(mappedBy = "kumite")
    private List<ParticipantKumite> participants;
}