import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AnalysisTask } from '../model/analysis-task';

@Injectable()
export class ExamTaskDetailService {
    constructor(private http: Http) { }

    public getTask(id: string): Promise<AnalysisTask> {
        return this.http.get('/api/task/' + id)
        .toPromise()
        .then((resp) => resp.json().data as AnalysisTask);
    }

    public saveDiagnosis(diagnosis: AnalysisTask): Promise<boolean> {
        return this.http.put('/api/task', diagnosis)
        .toPromise()
        .then((resp) => resp.json().code === 0);
    }
}
