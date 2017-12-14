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
    public localeText = {
        page: ' ',
        more: '更多',
        to: '-',
        of: '/',
        next: '下一页',
        last: '末页',
        first: '首页',
        previous: '上一页',
        loadingOoo: '加载中...',
    };

    constructor(
        private examListService: ExamListService
    ) {}

    ngOnInit() {
        this.columnDefs = [
            {headerName: '编号', field: 'patientId'},
            {headerName: '名称', field: 'patientName'},
            {headerName: '性别', field: 'sex'},
            {headerName: '出生日期', field: 'birthday'},
            {headerName: '分析状态', field: 'analysisStatus'},
            {headerName: '分析结果', field: 'analysisResult'},
            {headerName: '诊断结果', field: 'diagnosisResult'},
            {headerName: '阳性概率', field: 'positiveFraction', unSortIcon: true},
            {headerName: '操作', field: 'id', cellRendererFramework: CellBtnComponent, suppressSorting: true}
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
