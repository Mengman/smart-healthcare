package com.tianming.smarthealthcare.web.rest.vm;

public class DiagnoseTaskVM {
    private Long id;

    private Integer diagnosisResult; //0,1,2,3
    private String diagnosisComment;

    public DiagnoseTaskVM() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Integer getDiagnosisResult() {
        return diagnosisResult;
    }

    public void setDiagnosisResult(Integer diagnosisResult) {
        this.diagnosisResult = diagnosisResult;
    }

    public String getDiagnosisComment() {
        return diagnosisComment;
    }

    public void setDiagnosisComment(String diagnosisComment) {
        this.diagnosisComment = diagnosisComment;
    }
}
