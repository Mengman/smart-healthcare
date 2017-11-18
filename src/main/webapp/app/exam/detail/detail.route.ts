import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

import { ExamDetailComponent  } from './detail.component';

export const detailRoute: Route = {
    path: 'exam/:id',
    component: ExamDetailComponent,
    data: {
        pageTitle: 'global.menu.exam.detail'
    },
    canActivate: [UserRouteAccessService]
}
