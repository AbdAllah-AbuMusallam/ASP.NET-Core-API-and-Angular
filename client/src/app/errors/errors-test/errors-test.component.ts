import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errors-test',
  templateUrl: './errors-test.component.html'
})
export class ErrorsTestComponent implements OnInit {

  baseUrl: string = 'https://localhost:5001/api/';
  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  get404Error() {
    return this.http.get(this.baseUrl + 'Buggy/Not-Found').subscribe({
      next: () => { },
      error: (err) => console.log(err)
    })
  }

  get500Error() {
    return this.http.get(this.baseUrl + 'Buggy/Server-Error').subscribe({
      next: () => { },
      error: (err) => console.log(err)
    })
  }

  get400Error() {
    return this.http.get(this.baseUrl + 'Buggy/Bad-Request').subscribe({
      next: () => { },
      error: (err) => console.log(err)
    })
  }

  get401Error() {
    return this.http.get(this.baseUrl + 'Buggy/Auth').subscribe({
      next: () => { },
      error: (err) => console.log(err)
    })
  }

  get400ValidationError() {
    return this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: () => { },
      error: (err) => {
        console.log(err);
        this.validationErrors = err;
      }
    })
  }

}
