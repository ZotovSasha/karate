package org.karate.dto;

import lombok.Getter;
import lombok.Setter;
import org.karate.entity.Side;

import java.util.List;

@Getter
@Setter
public class KumiteDTO {
    private String tatamiId;
    private Integer teamId;
    private Side winner;
    private List<ParticipantDTO> participants;
}