package org.karate.dto;

import lombok.Data;

@Data
public class TatamiFightDTO {
    private String tatamiId;
    private String judgeFullName;
    private Integer judgingTeamId;

    public TatamiFightDTO(String tatamiId, String judgeFullName, Integer judgingTeamId) {
        this.tatamiId = tatamiId;
        this.judgeFullName = judgeFullName;
        this.judgingTeamId = judgingTeamId;
    }
}