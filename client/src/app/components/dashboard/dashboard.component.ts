import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { ChartService } from '../../services/chart.service';
import { UserService } from '../../services/data_services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isUserSelected: boolean = true;
  events: string[] = [];
  opened: boolean;
  enrollPIEChartData: any;
  verifiedPIEChartData: any;
  isLoaderShowed: boolean = false;
  constructor(
    private authenticationService: AuthenticationService,
    private chartService: ChartService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.authenticationService.checkLoggedIn();
    //this.getEnrollChartOptions();
    //this.getVerifiedChartOptions();
  }

  onRowClicked(rowID) {
    console.log(rowID + " clicked");
    this.isUserSelected = rowID == 0 ? true : false;
  }

  getEnrollChartOptions() {
    if (!this.isLoaderShowed) {
      this.spinner.show();
      this.isLoaderShowed = true;
    }
    this.userService.getEnrolledChartData()
      .subscribe(
        data => {
          this.enrollPIEChartData = this.chartService.getEnrollChartOptions(data[0]);
          this.spinner.hide();
        },
        error => {
          console.log("error : getEnrollChartOptions " + error);
          this.spinner.hide();
        });

  }

  getVerifiedChartOptions() {
    if (!this.isLoaderShowed) {
      this.spinner.show();
      this.isLoaderShowed = true;
    }
    this.userService.getVerifiedChartData()
      .subscribe(
        data => {
          this.verifiedPIEChartData = this.chartService.getVerifiedChartOptions(data[0]);
          this.spinner.hide();
        },
        error => {
          console.log("error : getVerifiedChartOptions " + error);
          this.spinner.hide();
        });

  }

}
