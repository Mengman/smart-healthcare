import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import {
    CaseListComponent,
    CellBtnComponent,
    CaseDetailComponent,
    caseStates
 } from './';

@NgModule({
    imports: [
        FormsModule,
        AgGridModule.withComponents([CellBtnComponent]),
        RouterModule.forRoot(caseStates, { useHash: true })
    ],
    exports: [],
    declarations: [
        CaseDetailComponent,
        CaseListComponent,
        CellBtnComponent
    ],
    providers: [],
})
export class SmarthealthcareCaseModule { }
