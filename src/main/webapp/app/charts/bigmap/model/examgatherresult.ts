export interface ExamGatherResult {
    code: number;
    msg: string;
    data: ExamGatherResultData;
}

export interface ExamGatherResultData {
    suspected: number;
    confirmed: number;
}
