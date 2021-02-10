import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import * as bcrypt from 'bcrypt';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private userService: UserService) {}

  users: User[];
  user: User;
  signingIn = true;
  creating = false;
  
  @Output() loginEvent = new EventEmitter<string>();

  ngOnInit(): void {
      this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  onSubmit(loginForm: any): void {
    console.log(loginForm);
    console.log(loginForm.firstName);
    this.users.forEach(async (user) => {
        if(user.first_name === loginForm.firstName && user.last_name === loginForm.lastName){
            console.log('MATCH');
            const hashedPwd = await bcrypt.hash(loginForm.password, 10);
            // console.log(hashedPwd);
            // console.log(user.password === hashedPwd);
        };
    });

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