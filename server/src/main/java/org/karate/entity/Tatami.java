package org.karate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tatami")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tatami {
    @Id
    @Column(name = "id_tatami")
    private String id;
}