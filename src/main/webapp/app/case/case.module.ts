import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AgGridModule } from 'ag-grid-angular';

import {
    CaseListComponent,
    CellBtnComponent,
    CaseDetailComponent,
    CaseNewComponent,
    caseStates
 } from './';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        AgGridModule.withComponents([CellBtnComponent]),
        RouterModule.forRoot(caseStates, { useHash: true })
    ],
    exports: [],
    declarations: [
        CaseNewComponent,
        CaseDetailComponent,
        CaseListComponent,
        CellBtnComponent
    ],
    providers: [],
})
export class SmarthealthcareCaseModule { }
