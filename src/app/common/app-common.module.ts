import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullComponent} from '../layouts/full/full.component';
import {RouterModule} from '@angular/router';
import {AuthenticationService} from './authentication/authentication.service';
import {AuthenticationGuard} from './authentication/authentication.guard';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    FullComponent
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ]
})
export class AppCommonModule {
}
