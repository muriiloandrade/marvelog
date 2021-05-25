import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResp } from '@core/interfaces/loginResp.dto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData: BehaviorSubject<LoginResp>;

  constructor(private router: Router) {
    this.userData = new BehaviorSubject<LoginResp>(
      JSON.parse(sessionStorage.getItem('currentUser') ?? ''),
    );
  }

  public set currentUserValue(value: LoginResp) {
    this.userData.next(value);
  }

  public get currentUserValue(): LoginResp {
    return this.userData.value;
  }

  logout(): void {
    // remove user from local storage and set current user to null
    sessionStorage.removeItem('currentUser');
    this.userData.next(JSON.parse(sessionStorage.getItem('currentUser') ?? ''));
    this.router.navigate(['auth/login']);
  }
}
