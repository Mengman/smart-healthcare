import { CaseListItem } from '../../case/model/case-list-item';
import { CtdAnalysis } from './ctd_analysis';

export class AnalysisTask {
    public id: number;
    public patient: CaseListItem;
    public ctdAnalysis: CtdAnalysis;
    public xrayId: number;
    public analysisResult: number;
    public analysisStatus: number;
    public diagnosisResult: number;
    public diagnosisComment: string;
    public positiveFraction: number;
    public createdDate: string;
    public ctdAnalysisResult: string;
    public ctdAnalysisStatus: number;
    public heatmapId: number;

}
