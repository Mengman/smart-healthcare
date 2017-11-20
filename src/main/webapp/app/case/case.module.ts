import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';

import { SmarthealthcareSharedModule } from '../shared';

import {
    CaseListComponent,
    CellBtnComponent,
    CaseDetailComponent,
    CaseNewComponent,
    CaseNewService,
    CaseListService,
    CaseDetailService,
    caseStates
 } from './';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        SmarthealthcareSharedModule,
        AgGridModule.withComponents([CellBtnComponent]),
        RouterModule.forRoot(caseStates, { useHash: true })
    ],
    exports: [CaseListComponent],
    declarations: [
        CaseNewComponent,
        CaseDetailComponent,
        CaseListComponent,
        CellBtnComponent
    ],
    providers: [
        CaseNewService,
        CaseListService,
        CaseDetailService
    ],
})
export class SmarthealthcareCaseModule { }
