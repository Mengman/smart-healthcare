import { Routes } from '@angular/router';

import { listRoute, detailRoute, caseListRoute, newExamTaskRoute } from './';

const EXAM_ROUTES = [
    listRoute,
    detailRoute,
    caseListRoute,
    newExamTaskRoute
]

export const examStates: Routes = [{
    path: '',
    children: EXAM_ROUTES
}]
