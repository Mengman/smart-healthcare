import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgUploaderModule } from 'ngx-uploader';

import { AgGridModule } from 'ag-grid-angular';

import { SmarthealthcareSharedModule } from '../shared';

import {
    ExamListComponent,
    CellBtnComponent,
    ExamDetailComponent,
    CaseListComponent,
    CaseListCellBtnComponent,
    ExamNewComponent,
    ExamCaseListService,
    ExamNewService,
    ExamListService,
    ExamTaskDetailService,
    examStates
} from './';

@NgModule({
    imports: [
        AgGridModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgUploaderModule,
        SmarthealthcareSharedModule,
        AgGridModule.withComponents([CellBtnComponent, CaseListCellBtnComponent]),
        RouterModule.forRoot(examStates, { useHash: true })
    ],
    exports: [],
    declarations: [
        ExamListComponent,
        CellBtnComponent,
        CaseListComponent,
        ExamDetailComponent,
        ExamNewComponent,
        CaseListCellBtnComponent
    ],
    providers: [ExamCaseListService, ExamNewService, ExamListService, ExamTaskDetailService],
})
export class SmarthealthcareExamModule { }
