import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private Router: Router, public auth: AuthService) { }
  private authListenerSubs!: Subscription
  userIsAuthenticated = false;
  isAdmin = false;


  ngOnInit() {
    // !Authentication
    this.userIsAuthenticated = this.auth.getIsAuth();
    const token = localStorage.getItem('token')
    if (token) {
      this.userIsAuthenticated = true
      if (this.auth.getCurrentUser.isAdmin === true) {
        this.isAdmin = true
        this.userIsAuthenticated = true
      }
    }

    this.authListenerSubs = this.auth
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.auth
      .getIsAdminStatusListener()
      .subscribe((data) => (this.isAdmin = data));

  }

  // ! AUTH
  logout() {
    this.auth.logout()
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe()
  }
}
