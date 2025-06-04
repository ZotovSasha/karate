package org.karate.dto;

import lombok.Getter;
import lombok.Setter;
import org.karate.entity.Side;

import java.util.List;

@Getter
@Setter
public class KumiteDTO {
    // Меняем тип с String на Integer, чтобы сразу подойти под findById(Integer)
    private Integer tatamiId;

    private Integer teamId;
    private Side winner;

    // Список «либо существующих, либо новых» участников
    private List<ParticipantDTO> participants;
}
