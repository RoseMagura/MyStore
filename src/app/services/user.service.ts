import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dataUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post(this.dataUrl, user, {
      observe: 'response',
      withCredentials: true
    });
  }
}
