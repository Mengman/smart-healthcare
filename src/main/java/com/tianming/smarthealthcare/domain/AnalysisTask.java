package com.tianming.smarthealthcare.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.tianming.smarthealthcare.enums.AnalysisStatus;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id")
public class AnalysisTask extends AbstractAuditingEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patientId")
    private Patient patient;
    private Long xrayId;
    private Integer analysisResult; // enum analysis result
    private Integer analysisStatus = AnalysisStatus.ANALYSING.getStatusCode();
    private String ctdAnalysisResult; // enum common thorax diseases analysis result
    private String ctdAnalysisFraction; // enum common thorax diseases analysis result
    private Integer ctdAnalysisStatus = AnalysisStatus.ANALYSING.getStatusCode(); // enum common thorax diseases analysis status
    private Integer diagnosisResult; // enum analysis result
    private String diagnosisComment;
    private Double positiveFraction;
    private Integer lungsegStatus = 0;
    private String heatmapPath;
    private Long heatmapId;

    @OneToOne
    @JoinColumn(name = "ctdAnalysisId")
    private CtdAnalysis ctdAnalysis;

    public AnalysisTask() {
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

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Double getPositiveFraction() {
        return positiveFraction;
    }

    public void setPositiveFraction(Double positiveFraction) {
        this.positiveFraction = positiveFraction;
    }

    public String getCtdAnalysisResult() {
        return ctdAnalysisResult;
    }

    public void setCtdAnalysisResult(String ctdAnalysisResult) {
        this.ctdAnalysisResult = ctdAnalysisResult;
    }

    public Integer getCtdAnalysisStatus() {
        return ctdAnalysisStatus;
    }

    public void setCtdAnalysisStatus(Integer ctdAnalysisStatus) {
        this.ctdAnalysisStatus = ctdAnalysisStatus;
    }

    public String getCtdAnalysisFraction() {
        return ctdAnalysisFraction;
    }

    public void setCtdAnalysisFraction(String ctdAnalysisFraction) {
        this.ctdAnalysisFraction = ctdAnalysisFraction;
    }

    public CtdAnalysis getCtdAnalysis() {
        return ctdAnalysis;
    }

    public void setCtdAnalysis(CtdAnalysis ctdAnalysis) {
        this.ctdAnalysis = ctdAnalysis;
    }

    public Integer getLungsegStatus() {
        return lungsegStatus;
    }

    public void setLungsegStatus(Integer lungsegStatus) {
        this.lungsegStatus = lungsegStatus;
    }

    public String getHeatmapPath() {
        return heatmapPath;
    }

    public void setHeatmapPath(String heatmapPath) {
        this.heatmapPath = heatmapPath;
    }

    public Long getHeatmapId() {
        return heatmapId;
    }

    public void setHeatmapId(Long heatmapId) {
        this.heatmapId = heatmapId;
    }
}
