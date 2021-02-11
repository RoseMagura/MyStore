import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dataUrl = 'http://localhost:3000/';
  private userUrl = this.dataUrl + 'users';

  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post(this.dataUrl, user, {
      observe: 'response',
      withCredentials: true
    });
  }

  signUp(user: User) {
    return this.http.post(this.userUrl, user, {
        observe: 'response',
      });
  }
}
