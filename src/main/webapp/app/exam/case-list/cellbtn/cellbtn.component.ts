import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
    selector: 'jhi-cell-btn',
    template: `<span><button class="btn btn-info" (click)="viewCaseDetail()">添加分析任务</button></span>`
})

export class CaseListCellBtnComponent implements AgRendererComponent  {
    private params;
    constructor() { }

    agInit(params: any): void {
        this.params = params;
    }

    refresh(): boolean {
        return false;
    }

    viewCaseDetail() {
        console.log(JSON.stringify(this.params.data));
    }
}
