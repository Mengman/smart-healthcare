import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

import { ExamNewComponent } from './new.component';

export const newExamTaskRoute: Route = {
    path: 'exam/task/create',
    component: ExamNewComponent,
    data: {
        pageTitle: 'global.menu.exam.new'
    },
    canActivate: [UserRouteAccessService]
}
