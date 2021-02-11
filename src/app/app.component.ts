import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MyStore';
  currentUser: string;

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser');
  }

  logOut() {
    localStorage.removeItem('currentUser');
    location.pathname = '/login';
  }
}
