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
public class JudgingTeam {
    @Id
    private Integer id;

    @OneToMany(mappedBy = "judgingTeam")
    private List<Judge> judges;
}