import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

import { ExamNewComponent } from './new.component';

export const newExamTaskRoute: Route = {
    path: 'exam/task/create/:id',
    component: ExamNewComponent,
    data: {
        pageTitle: 'global.menu.exam.new'
    },
    canActivate: [UserRouteAccessService]
};

export const createExamTaskRoute: Route = {
    path: 'exam/task/new',
    pathMatch: 'full',
    component: ExamNewComponent,
    data: {
        pageTitle: 'global.menu.exam.new'
    },
    canActivate: [UserRouteAccessService]
};
