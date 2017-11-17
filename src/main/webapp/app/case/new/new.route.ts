import { Route } from '@angular/router';

import { CaseNewComponent } from './new.component';

export const caseNewRoute: Route = {
    path: 'case/new',
    component: CaseNewComponent,
    data: {
        pageTitle: 'global.menu.case.new'
    }
}
