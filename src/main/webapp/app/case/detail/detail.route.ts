import { Route } from '@angular/router';

import { CaseDetailComponent } from './detail.component';

export const detailRoute: Route = {
    path: 'case/:id',
    component: CaseDetailComponent,
    data: {
        pageTitle: 'global.menu.case.detail'
    }
}
