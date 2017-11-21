import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
    selector: 'jhi-cell-btn',
    template: `<button class="btn btn-info btn-table" (click)="viewCaseDetail()">查看详情</button>`,
    styles: ['.btn-table { position: absolute; top: 50%; margin-top: -19px;}']
})

export class CellBtnComponent implements AgRendererComponent  {
    private params;
    constructor(private router: Router) { }

    agInit(params: any): void {
        this.params = params;
    }

    refresh(): boolean {
        return false;
    }

    viewCaseDetail() {
        this.router.navigateByUrl('/case/' + this.params.data.id);
    }
}
