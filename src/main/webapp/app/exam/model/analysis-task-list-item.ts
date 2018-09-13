export class AnalysisTaskListItem {
    public id: number;
    public patientName: string;
    public patientIdcard: string;
    public patientId: string;
    public sex: string;
    public birthday: string;
    public analysisStatus: string;
    public analysisResult: string;
    public diagnosisResult: string;
    public diagnosisComment: string;
    public positiveFraction: number;
    public sopInstanceUid: string;
    public institutionName: string;
    public imageDate: string;
    public createdDate: string;
    public ctdAnalysisResult: string;
    public ctdAnalysisStatus: string;
    // Consolidation or infiltrate 影响
    public tuberculosis: string;
    public nodule: string;
}
