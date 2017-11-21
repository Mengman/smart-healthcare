import {
    Component,
    OnInit
} from '@angular/core';
import {
    ActivatedRoute,
    ParamMap
} from '@angular/router';

import {
    AnalysisTask
} from '../model/analysis-task';
import {
    ExamTaskDetailService
} from './detail.service';

@Component({
    selector: 'jhi-exam-detail',
    templateUrl: 'detail.component.html',
    styleUrls: ['detail.style.scss']
})

export class ExamDetailComponent implements OnInit {
    public task: AnalysisTask;
    public analysisResult: string;

    constructor(
        private route: ActivatedRoute,
        private taskDetailService: ExamTaskDetailService
    ) {}

    ngOnInit() {
        this.route.paramMap.switchMap(
            (params: ParamMap) => this.taskDetailService.getTask(params.get('id'))
        ).subscribe((data) => {
            this.task = data;
            this.analysisResultConvert(data);
        });
    }

    private analysisResultConvert(task: AnalysisTask) {
        if (task.analysisResult) {
            switch (task.analysisResult) {
                case 0:
                    this.analysisResult = '无尘肺';
                    break;
                case 1:
                    this.analysisResult = '尘肺一期';
                    break;
                case 2:
                    this.analysisResult = '尘肺二期';
                    break;
                case 3:
                    this.analysisResult = '尘肺三期';

            }
        }
    }

}
