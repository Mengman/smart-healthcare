import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, NgUploaderService } from 'ngx-uploader';

import { ExamForm } from '../model/exam-form';
import { CaseListItem } from '../../case/model/case-list-item';

import { ExamNewService } from './new.service';

@Component({
    selector: 'jhi-exam-new',
    templateUrl: 'new.component.html',
    styleUrls: ['new.style.scss']
})
export class ExamNewComponent implements OnInit {
    public case: CaseListItem;

    public examForm: ExamForm;
    public step = 'firstStep';
    public uploadOptions: UploaderOptions;

    public testReport: UploadFile;
    public testReportUploadInput: EventEmitter<UploadInput>;

    public xRay: UploadFile;
    public xRayUploadInput: EventEmitter<UploadInput>;

    public lungFunction: UploadFile;
    public lungFunctionUploadInput: EventEmitter<UploadInput>;

    constructor(
        private route: ActivatedRoute,
        private examNewService: ExamNewService
    ) {}

    ngOnInit() {
        this.examForm = new ExamForm();
        this.testReportUploadInput = new EventEmitter<UploadInput>();
        this.xRayUploadInput = new EventEmitter<UploadInput>();
        this.lungFunctionUploadInput = new EventEmitter<UploadInput>();

        this.route.paramMap.switchMap(
            (params: ParamMap) => this.examNewService.getCase(params.get('id'))
        ).subscribe((data) => {
            this.case = data;
            this.examForm.patientId = this.case.id;
        } );
    }

     public onSubmit() {
        this.examNewService.saveTask(this.examForm);
     }

     public onUploadOutput(
         output: UploadOutput,
         bindingEvent: EventEmitter<UploadInput>,
         name: string
        ): void {

         if ( output.type === 'addedToQueue' || output.type ===  'uploading') {

            switch (name) {
                case 'testReport':
                this.testReport = output.file;
                break;
                case 'xRay':
                this.xRay = output.file;
                break;
                case 'lungFunction':
                this.lungFunction = output.file;
                break;
            }

         } else if ( output.type === 'done' ) {

            const resp = output.file.response;
            if (resp.msg === 'success') {

                switch (name) {
                    case 'testReport':
                    // this.examForm.testReport = resp.data.id;
                    break;
                    case 'xRay':
                    this.examForm.xrayId = resp.data.id;
                    break;
                    case 'lungFunction':
                    // this.examForm.lungFunction = resp.data.id;
                    break;
                }
            }
         } else if ( output.type === 'allAddedToQueue' ) {
            let bindingFile: UploadFile;
            switch (name) {
                case 'testReport':
                    bindingFile = this.testReport;
                    break;
                case 'xRay':
                    bindingFile = this.xRay;
                    break;
                case 'lungFunction':
                    bindingFile = this.lungFunction;
                    break;
            }

             const event: UploadInput = {
                type: 'uploadFile',
                url: '/api/files',
                method: 'POST',
                file: bindingFile,
                fileIndex: bindingFile.fileIndex
           };

           bindingEvent.emit(event);
         }

     }
}
