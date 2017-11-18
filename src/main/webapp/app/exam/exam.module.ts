import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import {
    ExamListComponent,
    CellBtnComponent,
    ExamDetailComponent,
    examStates
} from './';

@NgModule({
    imports: [
        AgGridModule,
        CommonModule,
        AgGridModule.withComponents([CellBtnComponent]),
        RouterModule.forRoot(examStates, { useHash: true })
    ],
    exports: [],
    declarations: [
        ExamListComponent,
        CellBtnComponent,
        ExamDetailComponent
    ],
    providers: [],
})
export class SmarthealthcareExamModule { }
