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
    @Column(name = "id_secretariat") // Соответствие первичному ключу
    private Integer id;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "first_name")
    private String firstName;

    @ManyToOne
    @JoinColumn(name = "fk_id_tatami") // Уже правильно
    private Tatami tatami;
}