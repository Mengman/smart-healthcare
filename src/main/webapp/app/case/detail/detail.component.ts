import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { CaseListItem } from '../model/case-list-item';
import { CaseDetailService } from './detail.service';

@Component({
    selector: 'jhi-case-detail',
    templateUrl: 'detail.component.html',
    styleUrls: ['detail.style.scss']
})
export class CaseDetailComponent implements OnInit {
    public case: CaseListItem;

    constructor(
        private route: ActivatedRoute,
        private caseDetailService: CaseDetailService

    ) { }

    ngOnInit() {
        this.route.paramMap.switchMap(
            (params: ParamMap) => this.caseDetailService.getCase(params.get('id'))
        ).subscribe((data) => this.case = data );
    }
}
