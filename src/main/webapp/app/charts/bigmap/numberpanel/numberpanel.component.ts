import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

import { BigMapService } from '../bigmap.service';
import { ExamGatherResult, ExamGatherResultData } from '../model/examgatherresult';

@Component({
    selector: 'jhi-number-panel',
    templateUrl: 'numberpanel.component.html',
    styleUrls: ['numberpanel.style.scss']
})

export class NumberPanelComponent implements OnInit, OnDestroy {
    public resultData: ExamGatherResultData = {totalTask: 0, suspected: 0, confirmed: 0, todayTask: 0, todaySuspected: 0, todayConfirmed: 0};
    private alive = true;
    private refreshDelay = 5000;
    constructor(private bigMapService: BigMapService) { }

    ngOnInit() {
        TimerObservable.create(0, this.refreshDelay)
        .takeWhile(() => this.alive)
        .subscribe(() => {
            this.bigMapService.getExamGatherResult().subscribe((resp) => {
                if (resp.code === 0) {
                    this.resultData = resp.data;
                }
            } );
        })
    }

    ngOnDestroy() {
        this.alive = false;
    }
}
