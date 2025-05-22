package org.karate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "judging_team")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JudgingTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_judging_team", nullable = false)
    private Integer id;

    @OneToMany(mappedBy = "judgingTeam", cascade = CascadeType.ALL)
    private List<Judge> judges;
}