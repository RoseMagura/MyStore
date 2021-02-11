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
  creationRes: object;

  onSubmit(loginForm: User): void {
    const fullName = loginForm.firstName + loginForm.lastName;
    console.log(fullName);
    this.userService.login(loginForm).subscribe((response) => {
      this.authMsg = response.body['message'];
      if(response.body['success']){
          localStorage.setItem('currentUser', fullName);
          location.pathname = '/products';
      }
    });
  }

  createUser(): void {
    this.signingIn = false;
    this.creating = true;
  }

  onPostUser(newUser: User): void {
    this.userService.signUp(newUser).subscribe(res => this.creationRes = res.body);
  }

  returnToLogin(): void {
    this.signingIn = true;
    this.creating = false;
  }
}
