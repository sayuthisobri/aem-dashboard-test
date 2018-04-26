import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '@app/common/app-config';
import {DashboardModel} from '@app/models/dashboard.model';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  fetchData() {
    return this.http.get<DashboardModel>(`${AppConfig.serverUrl}/api/dashboard`);
  }

}
