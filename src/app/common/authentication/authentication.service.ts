import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '@app/common/app-config';
import {map} from 'rxjs/operators';

export interface Credentials {
  success?: boolean;
  email?: string;
  token: string;
  msg?: string;
}

export interface LoginContext {
  email: string;
  password: string;
}

const tokenKey = 'token';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {
    const savedCredentials = sessionStorage.getItem(tokenKey) || localStorage.getItem(tokenKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  private _credentials: Credentials | null;

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    return this.http
      .post<Credentials>(`${AppConfig.serverUrl}/api/auth/login`, context)
      .pipe(map(credential => {
        credential.email = context.email;
        this.setCredentials(credential);
        //throw exception if authentication failed
        if (!this.isAuthenticated()) throw credential;
        return credential;
      }));
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    //TODO: Logic for authentication checking
    return !!this.credentials && this.credentials.success && !!this.credentials.token;
  }

  private setCredentials(credentials?: Credentials) {
    this._credentials = credentials || null;

    if (credentials) {
      localStorage.setItem(tokenKey, JSON.stringify(credentials));
    } else {
      localStorage.removeItem(tokenKey);
    }
  }

}
