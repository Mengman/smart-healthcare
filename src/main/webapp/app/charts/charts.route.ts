import { Routes } from '@angular/router';

import { bigmapRoute } from './bigmap/bigmap.route';

const CHARTS_ROUTES = [bigmapRoute]

export const chartsStates: Routes = [{
    path: '',
    children: CHARTS_ROUTES
}]
