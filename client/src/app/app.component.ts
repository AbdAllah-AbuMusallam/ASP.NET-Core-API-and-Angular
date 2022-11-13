import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  title = 'Dating App';

  constructor(private _accountService: AccountService) { }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    let user: User | null = null;
    if (localStorage.getItem('user'))
      user = JSON.parse(localStorage.getItem('user') || '{}');
    this._accountService.setCurrentUser(user);
  }

}
