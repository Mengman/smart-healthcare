import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { CaseListItem } from '../../case/model/case-list-item';

@Injectable()
export class ExamCaseListService {

    constructor(private http: Http) { }

    getCase(): Promise<CaseListItem[]> {
        return this.http.get('/api/patient').toPromise()
        .then((resp) => resp.json().data as CaseListItem[]);
    }
}
