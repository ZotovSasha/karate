package org.karate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "judges") // Явное указание имени таблицы
public class Judge {
    @Id
    @Column(name = "id_judge") // Соответствие столбцу в БД
    private Integer id;

    @Column(name = "last_name") // Аннотация для соответствия snake_case
    private String lastName;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "judge_category")
    private String judgeCategory;

    @ManyToOne
    @JoinColumn(name = "fk_id_judging_team") // Соответствие внешнему ключу
    private JudgingTeam judgingTeam;
}