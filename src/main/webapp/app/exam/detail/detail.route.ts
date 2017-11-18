import { Route } from '@angular/router';

import { ExamDetailComponent  } from './detail.component';

export const detailRoute: Route = {
    path: 'exam/:id',
    component: ExamDetailComponent,
    data: {
        pageTitle: 'global.menu.exam.detail'
    }
}
