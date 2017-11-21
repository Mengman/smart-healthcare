import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AnalysisTask } from '../model/analysis-task';
import { AnalysisTaskListItem } from '../model/analysis-task-list-item';
import { takeLast } from 'rxjs/operator/takeLast';

@Injectable()
export class ExamListService {
    constructor(private http: Http) { }

    getTask(): Promise<AnalysisTaskListItem[]> {
        return this.http.get('/api/task').toPromise()
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
        if (task.analysisStatus === 0) {
            item.analysisStatus = '分析中';
        } else {
            item.analysisStatus = '完成';
        }

        if (task.analysisResult) {

            switch (task.analysisResult) {
                case 0:
                    item.diagnosisResult = '无尘肺';
                    break;
                case 1:
                    item.diagnosisResult = '尘肺一期';
                    break;
                case 2:
                    item.diagnosisResult = '尘肺二期';
                    break;
                case 3:
                    item.diagnosisResult = '尘肺三期';

            }
        }
        return item;
    }

}
