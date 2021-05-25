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
    localStorage.setItem('expTime', JSON.stringify(expTime.valueOf()));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('expTime');
    this.router.navigate(['auth/login']);
  }
}
