import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CaseListItem } from '../model/case-list-item';

@Injectable()
export class CaseDetailService {
    constructor(private http: Http) { }

    getCase(id: string): Promise<CaseListItem> {
        return this.http.get('/api/patient/' + id)
        .toPromise()
        .then((resp) => resp.json().data);
    }
}
