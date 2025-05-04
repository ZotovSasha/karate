package org.karate.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "participant_category")
public class ParticipantCategory {
    @Id
    @Column(name = "id_participant_category")
    private Integer id;

    private String age;
    private String wieght;
    @Column(name = "gender", columnDefinition = "CHAR(1)")
    private String gender;


    // Конструкторы
    public ParticipantCategory() {}

    public ParticipantCategory(Integer id, String age, String wieght, String gender) {
        this.id = id;
        this.age = age;
        this.wieght = wieght;
        this.gender = gender;
    }

    // Геттеры и сеттеры
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getAge() { return age; }
    public void setAge(String age) { this.age = age; }

    public String getWieght() { return wieght; }
    public void setWieght(String wieght) { this.wieght = wieght; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
}