import { Component, OnInit } from '@angular/core';

import { BigMapService } from '../bigmap.service';
import { ExamGatherResult, ExamGatherResultData } from '../model/examgatherresult';

@Component({
    selector: 'jhi-number-panel',
    templateUrl: 'numberpanel.component.html',
    styleUrls: ['numberpanel.style.scss']
})

export class NumberPanelComponent implements OnInit {
    public resultData: ExamGatherResultData = {suspected: 0, confirmed: 0};

    constructor(private bigMapService: BigMapService) { }

    ngOnInit() {
        this.bigMapService.getExamGatherResult().subscribe((resp) => {
            if (resp.code === 0) {
                this.resultData = resp.data;
            }
        } );
    }
}
