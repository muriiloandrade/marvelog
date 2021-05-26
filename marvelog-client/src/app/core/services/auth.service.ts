import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResp } from '@core/interfaces/loginResp.dto';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  setSession(authResult: LoginResp) {
    const expTime = dayjs().add(authResult.expTime, 'seconds');

    localStorage.setItem('currentUser', authResult.access_token);
    localStorage.setItem('expTime', expTime.valueOf().toString());
  }

  isLoggedIn() {
    const expiration = localStorage.getItem('expTime');

    if (expiration) {
      return dayjs().isBefore(expiration);
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('expTime');
    this.router.navigate(['auth/login']);
  }
}
