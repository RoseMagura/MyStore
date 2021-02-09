import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/User';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor() {}

  user: User;
  signingIn = true;
  creating = false;
  
  @Output() loginEvent = new EventEmitter<string>();

  onSubmit(loginForm: any): void {
    // this.loginEvent.emit(orderForm);
    console.log(loginForm);
  }

  createUser(): void {
      this.signingIn = false;
      this.creating = true;
      console.log(this.creating);
  }
  
  onPostUser(form: any): void{
    console.log('CREATING USER', form);

  }
}