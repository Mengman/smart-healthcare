import { Routes } from '@angular/router';

import { listRoute, detailRoute } from './';

const EXAM_ROUTES = [
    listRoute,
    detailRoute
]

export const examStates: Routes = [{
    path: '',
    children: EXAM_ROUTES
}]
