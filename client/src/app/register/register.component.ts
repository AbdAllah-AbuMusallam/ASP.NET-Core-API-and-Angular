import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private _accountService: AccountService,
    private toastr: ToastrService) {
  }

  ngOnInit() { }

  register() {
    this._accountService.register(this.model).subscribe({
      next: () => this.cancel(),
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error);
      }
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
