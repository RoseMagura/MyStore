import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

private dataUrl = 'http://localhost:3000/users?accept';

  constructor(private http: HttpClient) {}

  test() {
    console.log(this.http.get(this.dataUrl));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.dataUrl);
  }
}
