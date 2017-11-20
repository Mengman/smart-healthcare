import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { Case } from '../model/case';

@Injectable()
export class CaseNewService {

    constructor(private http: Http, private router: Router) { }

    saveCase(unsaved: Case): Promise<any> {
        return this.http.post('/api/patient', unsaved)
        .toPromise()
        .then((resp) => {
            if ( resp.json().code === 0 ) {
                this.router.navigateByUrl('/case');
            }
        });
    }
}
