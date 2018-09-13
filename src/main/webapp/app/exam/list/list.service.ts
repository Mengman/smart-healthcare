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
        item.patientId = task.patient.patientId;

        if (task.patient.sex === 'M') {
            item.sex = '男';
        } else if (task.patient.sex === 'F') {
            item.sex = '女';
        } else {
            item.sex = '未知';
        }

        item.birthday = task.patient.birthday;
        item.patientName = task.patient.name;
        item.patientIdcard = task.patient.idcard;
        item.diagnosisComment = task.diagnosisComment;
        item.positiveFraction = task.positiveFraction;
        item.sopInstanceUid = task.patient.sopInstanceUid;
        item.institutionName = task.patient.institutionName;
        item.createdDate = task.createdDate;

        if (task.patient.imageDate) {
            item.imageDate = task.patient.imageDate;
        }

        if (task.analysisStatus === 0) {
            item.analysisStatus = '分析中';
        } else {
            item.analysisStatus = '完成';
        }

        item.analysisResult = this.convertNumberResult2Words(task.analysisResult);

        item.diagnosisResult = this.convertNumberResult2Words(task.diagnosisResult);
        if (task.ctdAnalysisStatus === 0) {
            item.ctdAnalysisStatus = '分析中';
        } else {
            item.ctdAnalysisStatus = '完成';
            item.ctdAnalysisResult = task.ctdAnalysisResult;

            if (task.ctdAnalysis.infiltration > 0.5 || task.ctdAnalysis.consolidation > 0.5) {
                item.tuberculosis = '阳性';
            } else {
                item.tuberculosis = '阴性';
            }
            if (task.ctdAnalysis.nodule > 0.5) {
                item.nodule = '阳性';
            } else {
                item.nodule = '阴性';
            }

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

    private date2String(date: Date): string {
        let str = date.getFullYear() + '-' + this.paddingTime(date.getMonth()) + '-' + this.paddingTime(date.getDate()) + ' ';

        str += this.paddingTime(date.getHours()) + ':' + this.paddingTime(date.getMinutes()) + ':' + this.paddingTime(date.getSeconds());
        return str;
    }

    private paddingTime(num: number): string {
        return num < 10 ? '0' + num : num + '';
    }

}
