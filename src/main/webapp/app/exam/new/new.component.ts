import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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

    public submited = false;
    public analysisStatus = 'analysising';

    public examForm: ExamForm;
    public step = 'firstStep';
    public uploadOptions: UploaderOptions;

    public bloodTestReport: UploadFile;
    public bloodTestReportUploadInput: EventEmitter<UploadInput>;

    public urineTestReport: UploadFile;
    public urineTestReportUploadInput: EventEmitter<UploadInput>;

    public liverTestReport: UploadFile;
    public liverTestReportUploadInput: EventEmitter<UploadInput>;

    public xRay: UploadFile;
    public xRayUploadInput: EventEmitter<UploadInput>;

    public lungFunction: UploadFile;
    public lungFunctionUploadInput: EventEmitter<UploadInput>;

    public internalMedicineReport: UploadFile;
    public internalMedicineReportUploadInput: EventEmitter<UploadInput>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private examNewService: ExamNewService
    ) {}

    ngOnInit() {
        this.examForm = new ExamForm();
        this.bloodTestReportUploadInput = new EventEmitter<UploadInput>();
        this.urineTestReportUploadInput = new EventEmitter<UploadInput>();
        this.liverTestReportUploadInput = new EventEmitter<UploadInput>();
        this.xRayUploadInput = new EventEmitter<UploadInput>();
        this.lungFunctionUploadInput = new EventEmitter<UploadInput>();
        this.internalMedicineReportUploadInput = new EventEmitter<UploadInput>();
        this.route.paramMap.switchMap(
            (params: ParamMap) => this.examNewService.getCase(params.get('id'))
        ).subscribe((data) => {
            this.case = data;
            if (data.id) {
                this.examForm.patientId = this.case.id;
            }
        } );
    }

     public onSubmit() {
        this.startAnalysis();
        this.examForm.patient = this.case;
        this.examNewService.saveTask(this.examForm);
     }

     private startAnalysis() {
         this.analysisStatus = 'drawing';
         this.router.navigateByUrl('/exam');

         // this.submited = true;
        // setTimeout(() => {
        //   this.analysisStatus = 'drawing';
        //   setTimeout(() => {
        //     // this.submited = false;
        //     this.router.navigateByUrl('/exam');
        //   }, 10000);
        // }, 20000);
      }

     public onUploadOutput(
         output: UploadOutput,
         bindingEvent: EventEmitter<UploadInput>,
         name: string
        ): void {

         if ( output.type === 'addedToQueue' || output.type ===  'uploading') {

            switch (name) {
                case 'bloodTestReport':
                this.bloodTestReport = output.file;
                break;
                case 'urineTestReport':
                    this.urineTestReport = output.file;
                    break;
                case 'liverTestReport':
                    this.liverTestReport = output.file;
                    break;
                case 'xRay':
                this.xRay = output.file;
                break;
                case 'lungFunction':
                this.lungFunction = output.file;
                break;
                case 'internalMedicineReport':
                this.internalMedicineReport = output.file;
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
                case 'bloodTestReport':
                    bindingFile = this.bloodTestReport;
                    break;
                case 'urineTestReport':
                    bindingFile = this.urineTestReport;
                    break;
                case 'liverTestReport':
                    bindingFile = this.liverTestReport;
                    break;
                case 'xRay':
                    bindingFile = this.xRay;
                    break;
                case 'lungFunction':
                    bindingFile = this.lungFunction;
                    break;
                case 'internalMedicineReport':
                    bindingFile = this.internalMedicineReport;
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
