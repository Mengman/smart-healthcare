import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid/main';

import { CellBtnComponent } from './cellbtn/cellbtn.component';
import { ExamListService } from './list.service';

@Component({
    selector: 'jhi-exam-list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.style.scss']
})

export class ExamListComponent implements OnInit {
    public gridOptions: GridOptions;
    public columnDefs;
    public rowData;

    constructor(
        private examListService: ExamListService
    ) {}

    ngOnInit() {
        this.columnDefs = [
            {headerName: '病人名称', field: 'patientName'},
            {headerName: '病人身份证号', field: 'patientIdcard'},
            {headerName: '分析状态', field: 'analysisStatus'},
            {headerName: '诊断结果', field: 'diagnosisResult'},
            {headerName: '分析建议', field: 'diagnosisComment'},
            {headerName: '操作', field: 'id', cellRendererFramework: CellBtnComponent}
        ]

        this.gridOptions =  <GridOptions>{
            columnDefs: this.columnDefs,
            context: {
                componentParent: this
            },
            rowHeight: 50
        };
    }

    public onGridReady(params) {
        params.api.sizeColumnsToFit();

        this.examListService.getTask()
        .then((data) => {
            params.api.setRowData(data)
        } );
    }
}
