import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

import { CaseListComponent } from './list.component';

export const caseListRoute: Route = {
    path: 'exam/task/selectcase',
    component: CaseListComponent,
    data: {
        pageTitle: 'global.menu.case.list'
    },
    canActivate: [UserRouteAccessService]
}
