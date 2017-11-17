import { Routes } from '@angular/router';

import { listRoute } from './';

const EXAM_ROUTES = [
    listRoute
]

export const examStates: Routes = [{
    path: '',
    children: EXAM_ROUTES
}]
