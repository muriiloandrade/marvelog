import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResp } from '@core/interfaces/loginResp.dto';
import { environment } from '@environment/environment';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class SignInService {
  baseURL = `${environment.baseUrl}/v1/auth`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(login: {
    login: string;
    password: string;
  }): Observable<LoginResp> {
    return this.http
      .post<LoginResp>(`${this.baseURL}/login`, {
      login: login.login,
      password: login.password,
    })
      .pipe(
        tap((res) => this.authService.setSession(res)),
      );
  }
}
