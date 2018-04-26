import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DashboardService} from '@app/dashboard/dashboard.service';
import {DashboardModel} from '@app/models/dashboard.model';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

declare var AmCharts: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnInit {
  dashboardData: Partial<DashboardModel> = {};
  private donutChart;
  private barChart;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.dashboardService
      .fetchData()
      .pipe(catchError((err) => {
        //TODO: put proper error handler
        console.log(`failed to load dashboard data`, err);
        return Observable.throw(err);
      }))
      .subscribe(this.updateDashboard);
  }

  updateDashboard = (data: DashboardModel) => {
    console.log('update data');
    this.dashboardData = data;
    if (this.donutChart) {
      this.donutChart.dataProvider = data.chartDonut || [];
      this.donutChart.validateData();
    }
    if (this.barChart) {
      this.barChart.dataProvider = data.chartBar || [];
      this.barChart.validateData();
    }
  };

  ngAfterViewInit(): void {
    console.log('view init');
    this.donutChart = AmCharts.makeChart('donutChart', {
      'type': 'pie',
      'theme': 'light',
      'dataProvider': this.dashboardData.chartDonut || [],
      'valueField': 'litres',
      'titleField': 'country',
      'labelRadius': -10,
      'radius': '42%',
      'innerRadius': '50%',
    });

    this.barChart = AmCharts.makeChart('barChart', {
      'type': 'serial',
      'theme': 'light',
      'dataProvider': this.dashboardData.chartBar || [],
      "graphs": [ {
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "visits"
      } ],
      "categoryField": "country",
    });
  }

}
