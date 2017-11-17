import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login.component';

const LOGIN_ROUTES: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            pageTitle: 'global.menu.login'
        }
    }
];

@NgModule({
    imports: [
        FormsModule,
        RouterModule.forRoot(LOGIN_ROUTES,  { useHash: true })
    ],
    exports: [],
    declarations: [LoginComponent],
    providers: [],
})
export class SmarthealthcareLoginModule { }
