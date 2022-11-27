import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html'
})
export class ServerErrorComponent implements OnInit {

  errors: any;

  constructor(private router: Router) {
    this.getErrorsFromRouter();
  }

  ngOnInit() { }

  getErrorsFromRouter() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      this.errors = navigation?.extras?.state?.['error'];
    }
  }

}
