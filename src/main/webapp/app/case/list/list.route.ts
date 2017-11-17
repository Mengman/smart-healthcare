import { Route } from '@angular/router';

import { CaseListComponent } from './list.component';

export const listRoute: Route = {
    path: 'case',
    component: CaseListComponent,
    data: {
        pageTitle: 'global.menu.case.list'
    }
}
