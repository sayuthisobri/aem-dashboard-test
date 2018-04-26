import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {AppCommonModule} from '../common/app-common.module';
import {RouterModule, Routes} from '@angular/router';
import {LayoutService} from '../layouts/layout.service';
import { DashboardService } from './dashboard.service';

const routes: Routes = [
  LayoutService.withContainer([
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
  ])
];

@NgModule({
  imports: [
    AppCommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DashboardComponent],
  providers: [
    DashboardService
  ]
})
export class DashboardModule {
}
