import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';

import { BatchUploadComponent } from './batch.upload.component';

export const batchUploadRoute: Route = {
    path: 'exam/task/batch',
    component: BatchUploadComponent,
    canActivate: [UserRouteAccessService]
}
