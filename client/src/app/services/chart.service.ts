import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  getGeneralPieChartOptions(title)
  {
    return  {
      chartType: 'PieChart',
      dataTable: [
        // ['Users', 'Count'],
        // ['Email Verified', 11],
        // ['Email Non-Verified', 2]
      ],
      options: {'title': title},
    };
  }

  getEnrollChartOptions(data){
    var pieChartOptions = this.getGeneralPieChartOptions("Enrolled/Non-Enrolled Users");
    pieChartOptions.dataTable = [
      ['Users','Count'],
      ['Enrolled Users',data.EnrolledUsers],
      ['Non-Enrolled Users',data.TotalUsers-data.EnrolledUsers]
    ]
    return pieChartOptions;
  }

  getVerifiedChartOptions(data){
    var pieChartOptions = this.getGeneralPieChartOptions("Verified/Non-Verified Users");
    pieChartOptions.dataTable = [
      ['Users','Count'],
      ['Verified Users',data.VerifiedUsers],
      ['Non-Verified Users',data.TotalUsers-data.VerifiedUsers]
    ]
    return pieChartOptions;
  }

}
