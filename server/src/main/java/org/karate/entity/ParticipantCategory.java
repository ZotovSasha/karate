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
public class ParticipantCategory {
    @Id
    @Column(name = "id_participant_category")
    private Integer id;

    private String age;

    @Column(name = "wieght")
    private String weight;

    private String gender;

    @OneToMany(mappedBy = "category")
    private List<Participant> participants;
}