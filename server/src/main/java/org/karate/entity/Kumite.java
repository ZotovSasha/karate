package org.karate.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "kumite")
public class Kumite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_kumite")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "tatami_id", nullable = false)
    private Tatami tatami;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private JudgingTeam team;

    @Enumerated(EnumType.STRING)
    private Side winner;

    @OneToMany(mappedBy = "kumite", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ParticipantKumite> participantAssociations = new ArrayList<>();
}
