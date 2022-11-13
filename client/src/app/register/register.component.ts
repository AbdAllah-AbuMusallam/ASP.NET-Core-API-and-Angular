import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private _accountService: AccountService) { }

  ngOnInit() { }

  register() {
    this._accountService.register(this.model).subscribe({
      next: () => this.cancel(),
      error: (err) => console.log(err)
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
