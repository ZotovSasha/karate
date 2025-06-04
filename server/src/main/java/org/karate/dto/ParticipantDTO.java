package org.karate.dto;

import lombok.Getter;
import lombok.Setter;
import org.karate.entity.Side;

@Getter
@Setter
public class ParticipantDTO {
    private Integer participantId;
    private Side side;
    private String firstName;
    private String lastName;
    private String personalCode;
    private Integer categoryId;
}
