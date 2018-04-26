import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {AuthenticationService, LoginContext} from '@app/common/authentication/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string;
  isLoading = false;
  @ViewChild('loginForm') loginForm: NgForm;
  public loginData: LoginContext = {email: null, password: null};

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  login() {
    this.isLoading = true;
    this.authenticationService.login(this.loginData)
      .pipe(finalize(() => {
        this.loginForm.form.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe(credentials => {
        console.debug(`Successfully logged in`, credentials);
        this.router.navigate(['/'], {replaceUrl: true});
      }, error => {
        console.debug(`Login error:`, error);
        this.error = error && error.msg;
      });
  }

}
