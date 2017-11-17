import { Routes } from '@angular/router';

import { listRoute, detailRoute, caseNewRoute } from './';

const CASE_ROUTES = [
    listRoute,
    caseNewRoute,
    detailRoute
]

export const caseStates: Routes = [{
    path: '',
    children: CASE_ROUTES
}]
