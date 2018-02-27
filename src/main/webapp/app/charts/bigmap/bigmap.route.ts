import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

import { BigmapComponent } from './bigmap.component';

export const bigmapRoute: Route = {
    path: 'charts/bigmap',
    data: {
        pageTitle: 'global.charts.bigmap'
    },
    component: BigmapComponent
}
