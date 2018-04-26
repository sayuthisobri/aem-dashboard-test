import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {RouterModule, Routes} from '@angular/router';
import {AppCommonModule} from '../common/app-common.module';

const routes: Routes = [
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    AppCommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {
}
