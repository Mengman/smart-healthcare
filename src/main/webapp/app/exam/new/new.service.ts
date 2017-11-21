import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { ExamForm } from '../model/exam-form';
import { CaseListItem } from '../../case/model/case-list-item';

@Injectable()
export class ExamNewService {
    constructor(
        private http: Http,
        private router: Router
    ) { }

    getCase(id: string): Promise<CaseListItem> {
        return this.http.get('/api/patient/' + id)
        .toPromise()
        .then((resp) => resp.json().data);
    }

    public saveTask(examForm: ExamForm) {
        return this.http.post('/api/task', examForm)
        .toPromise()
        .then((resp) => {
            if (resp.json().code === 0) {
                this.router.navigateByUrl('/exam');
            }
        })
    }
}
