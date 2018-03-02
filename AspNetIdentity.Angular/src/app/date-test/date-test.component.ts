import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateRequest } from './date-request';
import { environment } from '../../environments/environment';

@Component({
  selector: 'khk-date-test',
  templateUrl: './date-test.component.html',
  styleUrls: ['./date-test.component.scss']
})
export class DateTestComponent implements OnInit {
  url = `${environment.apiHost}/api/date`;

  request: DateRequest;
  response: any;

  inputDate: Date;
  inputDateText: string;
  orderDate: Date;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.inputDate = new Date();
    this.inputDateText = (new Date()).toISOString();
  }

  onSubmit() {
    if (!this.inputDate) {
      console.error('empty date!!!!');
      return;
    }

    const body = new DateRequest();
    const date = this.getDate(); // new Date(this.inputDate);
    const isoDate = date.toISOString();
    const utc = date.toUTCString();
console.log(this.inputDate, date);

    body.date = date;
    body.dateString = isoDate; // this.inputDateText;
    body.epoch = this.getEpoch(date);
    this.http.post<any>(this.url, body).subscribe(res => {
console.log(res);
      this.response = res;
      this.orderDate = this.response.order.NewDate;
    });

console.log('submitted', body, utc);
  }

  private getEpoch(date: Date): number {
    return Math.round(date.getTime() / 1000);
  }

  private getDate(): Date {
    const d = new Date(this.inputDate); // date only
    const result = new Date();

    result.setDate(d.getDate());
    result.setMonth(d.getMonth());
    result.setFullYear(d.getFullYear());
    return result;
  }
}
