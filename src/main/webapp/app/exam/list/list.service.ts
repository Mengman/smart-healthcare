import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AnalysisTask } from '../model/analysis-task';
import { AnalysisTaskListItem } from '../model/analysis-task-list-item';
import { takeLast } from 'rxjs/operator/takeLast';

@Injectable()
export class ExamListService {
    public sortingOrder = ['desc', 'asc', null];

    constructor(private http: Http) { }

    getTask(): Promise<AnalysisTaskListItem[]> {
        return this.http.get('/api/allTask').toPromise()
        .then((resp) => {
            const analysisTasks =  resp.json().data as AnalysisTask[];
            const items: AnalysisTaskListItem[] = [];
            analysisTasks.map((task) => items.push(this.convertAnalysisTask2ListItem(task)))
            return items;
        })
    }

    private convertAnalysisTask2ListItem(task: AnalysisTask):  AnalysisTaskListItem {
        const item = new AnalysisTaskListItem();
        item.id = task.id;
        item.patientName = task.patient.name;
        item.patientIdcard = task.patient.idcard;
        item.diagnosisComment = task.diagnosisComment;
        item.positiveFraction = task.positiveFraction;
        if (task.analysisStatus === 0) {
            item.analysisStatus = '分析中';
        } else {
            item.analysisStatus = '完成';
        }

        if (task.analysisResult) {
            item.analysisResult = this.convertNumberResult2Words(task.analysisResult)
        }

        if (task.diagnosisResult) {
            item.diagnosisResult = this.convertNumberResult2Words(task.diagnosisResult);
        }
        return item;
    }

    private convertNumberResult2Words(result: number): string {
        switch (result) {
            case 0:
                return '无尘肺';
            case 1:
                return '尘肺一期';
            case 2:
                return '尘肺二期';
            case 3:
                return '尘肺三期';
            case 10:
                return '阳性'
        }
        return null;
    }

}
