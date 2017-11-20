import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Case } from '../model/case';
import { CaseNewService } from './new.service';

@Component({
    selector: 'jhi-case-new',
    templateUrl: 'new.component.html',
    styleUrls: ['new.style.scss']
})

export class CaseNewComponent implements OnInit {
    public case: Case = new Case();
    public birthday: Date;

    constructor(
        private caseNewService: CaseNewService
    ) { }

    ngOnInit() { }

    public onSubmit() {
        if (this.birthday) {
            this.case.birthday = this.formatBirthday();
        }
        this.caseNewService.saveCase(this.case);
    }

    public formatBirthday(): string {
        return this.birthday.year + '-' + this.birthday.month + '-' + this.birthday.day;
    }

}

class Date {
    year: number;
    month: number;
    day: number;
}
