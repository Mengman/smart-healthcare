import { Component, OnInit, EventEmitter } from '@angular/core';
import {AuthServerProvider} from '../../shared/auth/auth-jwt.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, NgUploaderService } from 'ngx-uploader';

@Component({
    selector: 'jhi-batch-upload',
    templateUrl: 'batch.upload.component.html',
    styleUrls: ['batch.upload.style.scss']
})

export class BatchUploadComponent implements OnInit {
    public uploadOptions: UploaderOptions;
    public files: UploadFile[];
    public uploadInput: EventEmitter<UploadInput>;

    constructor(private authServiceProvider: AuthServerProvider) { }

    ngOnInit() {
        this.files = [];
        this.uploadInput = new EventEmitter<UploadInput>();
    }

    public onUploadOutput(output: UploadOutput): void {
        if (output.type === 'allAddedToQueue') {
            const event: UploadInput = {
                type: 'uploadAll',
                url: '/api/dicomParse',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + this.authServiceProvider.getToken() },
           };

           this.uploadInput.emit(event);
        } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
            this.files.push(output.file);
        }
    }

    public checkProgress(file: UploadFile): boolean {
        return file.progress.data.percentage < 100;
    }
}
