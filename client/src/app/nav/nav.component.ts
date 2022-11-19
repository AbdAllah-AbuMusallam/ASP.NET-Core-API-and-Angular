import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public _accountService: AccountService,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit() { }

  login() {
    this._accountService.login(this.model).subscribe({
      next: () => this.router.navigateByUrl('/members'),
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error);
      }
    })
  }

  logout() {
    this._accountService.logout();
    this.router.navigateByUrl('/');
  }

}
