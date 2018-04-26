import {Route, Routes} from '@angular/router';
import {FullComponent} from './full/full.component';
import {AuthenticationGuard} from '@app/common/authentication/authentication.guard';

export class LayoutService {

  static withContainer(routes: Routes): Route {
    return {
      path: '',
      component: FullComponent,
      children: routes,
      canActivate: [AuthenticationGuard],
      // Reuse ShellComponent instance when navigating between child views
      data: {reuse: true}
    };
  }

}
