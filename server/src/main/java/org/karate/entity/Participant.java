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
public class Participant {
    @Id
    @Column(name = "id_participant")
    private Integer id;

    private String lastName;
    private String firstName;
    private String region;

    @ManyToOne
    @JoinColumn(name = "fk_id_participant_category")
    private ParticipantCategory category;

    @OneToMany(mappedBy = "participant")
    private List<ParticipantKumite> kumites;
}