import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DecodedToken, LoginResp } from '@core/interfaces/loginResp.dto';
import { JwtHelperService } from '@auth0/angular-jwt';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(private router: Router) {}

  setSession(authResult: LoginResp) {
    const expTime = dayjs().add(authResult.expTime, 'seconds');

    localStorage.setItem('currentUser', authResult.access_token);
    localStorage.setItem('expTime', expTime.valueOf().toString());
  }

  // eslint-disable-next-line consistent-return
  getDecodedToken(): DecodedToken {
    const token = localStorage.getItem('currentUser');
    if (token) {
      return this.jwtHelper.decodeToken<DecodedToken>(token);
    }

    return {} as DecodedToken;
  }

  isTokenExpired() {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      return this.jwtHelper.isTokenExpired(currentUser);
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('expTime');
    this.router.navigate(['auth/login']);
  }
}
