import { Routes } from '@angular/router';

import { listRoute, detailRoute, batchUploadRoute, caseListRoute, newExamTaskRoute } from './';

const EXAM_ROUTES = [
    listRoute,
    detailRoute,
    caseListRoute,
    batchUploadRoute,
    newExamTaskRoute
]

export const examStates: Routes = [{
    path: '',
    children: EXAM_ROUTES
}]
