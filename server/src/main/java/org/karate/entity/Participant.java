package org.karate.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "participant")
public class Participant {
    @Id
    @Column(name = "id_participant")
    private Integer id;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "first_name")
    private String firstName;

    private String region;

    @ManyToOne
    @JoinColumn(name = "fk_id_participant_category")
    private ParticipantCategory category;

    // Конструкторы
    public Participant() {}

    public Participant(Integer id, String lastName, String firstName,
                       String region, ParticipantCategory category) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.region = region;
        this.category = category;
    }

    // Геттеры и сеттеры
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public ParticipantCategory getCategory() { return category; }
    public void setCategory(ParticipantCategory category) { this.category = category; }
}