import { Route } from '@angular/router';

import { CaseListComponent } from './list.component';

export const caseListRoute: Route = {
    path: 'exam/task/selectcase',
    component: CaseListComponent,
    data: {
        pageTitle: 'global.menu.case.list'
    }
}
