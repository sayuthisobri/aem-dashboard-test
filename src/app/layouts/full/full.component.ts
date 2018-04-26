import {Component} from '@angular/core';
import {AuthenticationService} from '@app/common/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  onLogout() {
    this.authService
      .logout()
      .subscribe(() => {
        this.router.navigate(['/login']).then(() => {
          console.debug(`Successfully logout`);
        });
      });
  }

}
