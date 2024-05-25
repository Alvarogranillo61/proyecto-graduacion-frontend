import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isSidenavOpened = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.jwtUserToken.subscribe(token => {
      this.isLoggedIn = !!token;
    });
  }

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  logout() {
    this.apiService.logout();
  }
}
