package org.karate.dto;

import lombok.Data;
import org.karate.entity.Participant;

@Data
public class ParticipantDTO {
    private Integer id;
    private String firstName;
    private String lastName;
    private String region;
    private Integer categoryId;

    // Конвертация Entity <-> DTO
    public static ParticipantDTO fromEntity(Participant p) {
        ParticipantDTO dto = new ParticipantDTO();
        dto.setId(p.getId());
        dto.setFirstName(p.getFirstName());
        dto.setLastName(p.getLastName());
        dto.setRegion(p.getRegion());
        dto.setCategoryId(p.getCategory().getId());
        return dto;
    }
}