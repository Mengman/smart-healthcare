import { Component, OnInit } from '@angular/core';

import { ExamResult } from '../model/exam-result';

@Component({
    selector: 'jhi-exam-detail',
    templateUrl: 'detail.component.html',
    styleUrls: ['detail.style.scss']
})

export class ExamDetailComponent implements OnInit {
    public examResult: ExamResult;
    constructor() { }

    ngOnInit() {
        this.examResult = new ExamResult(
            '张三',
            'male',
            '1985-02-12',
            '1',
            '32',
            '尘肺'
        );
     }
}
