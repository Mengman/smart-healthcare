import { Component, OnInit } from '@angular/core';
import { CellBtnComponent } from './cellbtn/cellbtn.component';
import { GridOptions } from 'ag-grid/main';

@Component({
    selector: 'jhi-case-list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.style.scss']
})

export class CaseListComponent implements OnInit {
    public gridOptions: GridOptions;
    columnDefs;
    rowData;

    constructor() {
        this.columnDefs = [
            {headerName: 'ID', field: 'id'},
            {headerName: '名称', field: 'name'},
            {headerName: '性别', field: 'gender'},
            {headerName: '联系电话', field: 'phone'},
            {headerName: '接尘工龄', field: 'exposeAge'},
            {headerName: '粉尘性质', field: 'type'},
            {headerName: '就医时间', field: 'visitTime'},
            {headerName: '操作', field: 'id', cellRendererFramework: CellBtnComponent}
        ];

        this.rowData = [
            {id: '1', name: '张三', gender: '男', phone: '1326874574', exposeAge: 2, type: '石墨尘肺', visitTime: '2017-09-24 13:22:22'},
            {id: '2', name: '李四', gender: '男', phone: '1326874574', exposeAge: 2, type: '石墨尘肺', visitTime: '2017-09-24 13:22:22'},
            {id: '3', name: '王五', gender: '男', phone: '1326874574', exposeAge: 2, type: '石墨尘肺', visitTime: '2017-09-24 13:22:22'},
            {id: '4', name: '刘文', gender: '男', phone: '1326874574', exposeAge: 2, type: '石墨尘肺', visitTime: '2017-09-24 13:22:22'},
            {id: '5', name: '张达', gender: '男', phone: '1326874574', exposeAge: 2, type: '石墨尘肺', visitTime: '2017-09-24 13:22:22'},
            {id: '6', name: '刘六', gender: '男', phone: '1326874574', exposeAge: 2, type: '石墨尘肺', visitTime: '2017-09-24 13:22:22'}
        ];

        this.gridOptions = <GridOptions>{
            rowData: this.rowData,
            columnDefs: this.columnDefs,
            context: {
                componentParent: this
            }
        };
     }

    ngOnInit() {
     }
}
