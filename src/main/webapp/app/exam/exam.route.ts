import { Routes } from '@angular/router';

import { listRoute, detailRoute, batchUploadRoute, caseListRoute, newExamTaskRoute, createExamTaskRoute } from './';

const EXAM_ROUTES = [
    listRoute,
    detailRoute,
    caseListRoute,
    batchUploadRoute,
    newExamTaskRoute,
    createExamTaskRoute
]

export const examStates: Routes = [{
    path: '',
    children: EXAM_ROUTES
}]
