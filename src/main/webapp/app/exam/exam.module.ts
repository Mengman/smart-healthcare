import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgUploaderModule } from 'ngx-uploader';

import { AgGridModule } from 'ag-grid-angular';

import {
    ExamListComponent,
    CellBtnComponent,
    ExamDetailComponent,
    CaseListComponent,
    CaseListCellBtnComponent,
    ExamNewComponent,
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
    providers: [],
})
export class SmarthealthcareExamModule { }