package org.karate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "secretariat")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Secretariat {
    @Id
    @Column(name = "id_secretariat")
    private Integer id;

    private String lastName;
    private String firstName;

    @ManyToOne
    @JoinColumn(name = "fk_id_tatami")
    private Tatami tatami;
}