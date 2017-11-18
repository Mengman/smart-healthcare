package com.tianming.smarthealthcare.web.rest.vm;

public class AnalysisTaskVM{
    private Long id;

    private Long patientId;
    private Long xrayId;
    private Integer analysisResult; //0,1,2,3
    private Integer analysisStatus = 0; //0-analyzing, 1-finished
    private Integer diagnosisResult; //0,1,2,3
    private String diagnosisComment;

    public AnalysisTaskVM() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getXrayId() {
        return xrayId;
    }

    public void setXrayId(Long xrayId) {
        this.xrayId = xrayId;
    }

    public Integer getAnalysisResult() {
        return analysisResult;
    }

    public void setAnalysisResult(Integer analysisResult) {
        this.analysisResult = analysisResult;
    }

    public Integer getAnalysisStatus() {
        return analysisStatus;
    }

    public void setAnalysisStatus(Integer analysisStatus) {
        this.analysisStatus = analysisStatus;
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

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }
}
