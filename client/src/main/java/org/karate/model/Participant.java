package org.karate.model;

public class Participant {
    private Integer id;
    private String lastName;
    private String firstName;
    private String region;
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