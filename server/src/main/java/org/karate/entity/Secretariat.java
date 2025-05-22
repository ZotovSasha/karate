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
public class Secretariat {
    @Id
    private Integer id;

    private String lastName;
    private String firstName;

    @ManyToOne
    @JoinColumn(name = "fk_id_tatami")
    private Tatami tatami;

    @OneToMany(mappedBy = "secretariat")
    private List<SecretariatJudges> secretariatJudges;
}