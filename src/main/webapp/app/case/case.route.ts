import { Routes } from '@angular/router';

import { listRoute, detailRoute } from './';

const CASE_ROUTES = [
    listRoute,
    detailRoute
]

export const caseStates: Routes = [{
    path: '',
    children: CASE_ROUTES
}]
