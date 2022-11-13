import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public _accountService: AccountService) { }

  ngOnInit() { }

  login() {
    this._accountService.login(this.model).subscribe({
      next: () => { },
      error: (err) => { console.log(err); }
    })
  }

  logout() {
    this._accountService.logout();
  }

}
