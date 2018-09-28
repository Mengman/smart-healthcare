import {CaseListItem} from '../../case/model/case-list-item';

export class ExamForm {
    public patientId: number;
    public xrayId: number;
    public analysisResult: number;
    public analysisStatus: number;
    public diagnosisResult: number;
    public diagnosisComment: string;
    public patient: CaseListItem;
}
