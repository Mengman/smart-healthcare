import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
    selector: 'jhi-cell-btn',
    template: `<span><button class="btn btn-info" (click)="viewCaseDetail()">查看详情</button></span>`
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
        console.log(JSON.stringify(this.params.data));
        this.router.navigateByUrl('/case/' + this.params.data.id);
    }
}
