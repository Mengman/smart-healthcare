import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

import { CaseListComponent } from './list.component';

export const listRoute: Route = {
    path: 'case',
    component: CaseListComponent,
    data: {
        pageTitle: 'global.menu.case.list'
    },
    canActivate: [UserRouteAccessService]
}
