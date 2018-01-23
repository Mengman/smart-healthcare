import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

import { BigmapComponent } from './bigmap.component';

export const bigmapRoute: Route = {
    path: 'charts/bigmap',
    component: BigmapComponent,
    canActivate: [UserRouteAccessService]
}
