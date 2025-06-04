package org.karate.dto;

import lombok.Getter;
import lombok.Setter;
import org.karate.entity.Side;

@Getter
@Setter
public class ParticipantDTO {
    private Integer participantId;
    private Side side;
}