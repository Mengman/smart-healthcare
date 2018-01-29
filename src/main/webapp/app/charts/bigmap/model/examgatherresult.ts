export interface ExamGatherResult {
    code: number;
    msg: string;
    data: ExamGatherResultData;
}

export interface ExamGatherResultData {
    totalTask: number;
    suspected: number;
    confirmed: number;

    todayTask: number;
    todaySuspected: number;
    todayConfirmed: number;
}
