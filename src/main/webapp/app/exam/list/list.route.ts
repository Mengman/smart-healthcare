import { Route } from '@angular/router';

import { ExamListComponent } from './list.component';

export const listRoute: Route = {
    path: 'exam',
    component: ExamListComponent,
    data: {
        pageTitle: 'global.menu.exam.list'
    }
}
