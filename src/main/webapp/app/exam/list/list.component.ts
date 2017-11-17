import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid/main';

import { CellBtnComponent } from './cellbtn/cellbtn.component';

@Component({
    selector: 'jhi-exam-list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.style.scss']
})

export class ExamListComponent implements OnInit {
    public gridOptions: GridOptions;
    public columnDefs;
    public rowData;

    constructor() {
        this.columnDefs = [
            {headerName: '医生', field: 'doctorName'},
            {headerName: '病人名称', field: 'patientName'},
            {headerName: '病人身份证号', field: 'patientId'},
            {headerName: '分析状态', field: 'examStatus'},
            {headerName: '分析建议', field: 'examDesc'},
            {headerName: '诊断结果', field: 'examResult'},
            {headerName: '操作', field: 'id', cellRendererFramework: CellBtnComponent}
        ]

        this.rowData = [
            {id: '1', doctorName: '张医生', patientName: '李四', patientId: '13258745698547452', examStatus: '分析中', examDesc: '', examResult: '尘肺3期'},
            {id: '2', doctorName: '张医生', patientName: '李四', patientId: '13258745698547452', examStatus: '分析中', examDesc: '', examResult: '尘肺3期'},
            {id: '3', doctorName: '张医生', patientName: '李四', patientId: '13258745698547452', examStatus: '分析中', examDesc: '', examResult: '尘肺3期'},
            {id: '4', doctorName: '张医生', patientName: '李四', patientId: '13258745698547452', examStatus: '分析中', examDesc: '', examResult: '尘肺3期'},
            {id: '5', doctorName: '张医生', patientName: '李四', patientId: '13258745698547452', examStatus: '分析中', examDesc: '', examResult: '尘肺3期'}
        ]

        this.gridOptions =  <GridOptions>{
            rowData: this.rowData,
            columnDefs: this.columnDefs,
            context: {
                componentParent: this
            }
        };
     }

    ngOnInit() { }
}
