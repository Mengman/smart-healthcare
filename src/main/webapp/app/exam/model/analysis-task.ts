import { CaseListItem } from '../../case/model/case-list-item';

export class AnalysisTask {
    public id: number;
    public patient: CaseListItem;
    public xrayId: number;
    public analysisResult: number;
    public analysisStatus: number;
    public diagnosisResult: number;
    public diagnosisComment: string;
    public positiveFraction: number;
}
