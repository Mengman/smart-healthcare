import { Component, OnInit } from '@angular/core';
import { CaseListCellBtnComponent } from './cellbtn/cellbtn.component';
import { GridOptions } from 'ag-grid/main';

import { ExamCaseListService } from './list.service';

@Component({
    selector: 'jhi-case-list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.style.scss']
})

export class CaseListComponent implements OnInit {
    public gridOptions: GridOptions;
    public columnDefs;
    public rowData;
    public gridApi;
    public gridColumnApi;

    constructor(private caseListService: ExamCaseListService) {}

    ngOnInit() {
        this.columnDefs = [
            {headerName: 'ID', field: 'id'},
            {headerName: '名称', field: 'name'},
            {headerName: '性别', field: 'sex'},
            {headerName: '联系电话', field: 'cellPhone'},
            {headerName: '接尘工龄', field: 'workDuration'},
            {headerName: '粉尘性质', field: 'workType'},
            {headerName: '操作', field: 'id', cellRendererFramework: CaseListCellBtnComponent}
        ];

        this.gridOptions = <GridOptions>{
            columnDefs: this.columnDefs,
            context: {
                componentParent: this
            },
            rowHeight: 50
        };
    }

    public onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();

        this.caseListService.getCase()
        .then((data) => {
            params.api.setRowData(data)
        } );
    }
}
