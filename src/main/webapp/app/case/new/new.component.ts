import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Case } from '../model/case';

@Component({
    selector: 'jhi-case-new',
    templateUrl: 'new.component.html',
    styleUrls: ['new.style.scss']
})

export class CaseNewComponent implements OnInit {
    public case: Case = new Case();

    constructor() { }

    ngOnInit() { }

    public onSubmit() {}

}
