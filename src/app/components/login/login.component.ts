import { Component } from '@angular/core';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private userService: UserService) {}

  user: User;
  signingIn = true;
  creating = false;
  authMsg: string;
  error = false;

  onSubmit(loginForm: any): void {
    console.log(loginForm);
    this.userService
      .login(loginForm)
      .subscribe((response) => {
        console.log(response.body['message'], response.body['success']);
        this.error = !response.body['success'];
        this.authMsg = response.body['message'];
      }
          );
  }

  createUser(): void {
    this.signingIn = false;
    this.creating = true;
    console.log(this.creating);
  }

  onPostUser(form: any): void {
    console.log('CREATING USER', form);
  }

}
