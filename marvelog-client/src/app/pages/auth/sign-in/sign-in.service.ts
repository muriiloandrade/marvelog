import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginResp } from '@core/interfaces/loginResp.dto';
import { AuthService } from '@core/services/auth.service';
import { environment } from '@environment/environment';

@Injectable()
export class SignInService {
  baseURL = `${environment.baseUrl}/v1/auth`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(login: {
    numTelefone: string;
    password: string;
  }): Observable<LoginResp> {
    return this.http
      .post<LoginResp>(`${this.baseURL}/v1/login`, {
      login: login.numTelefone,
      password: login.password,
    })
      .pipe(
        map((user) => {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.authService.currentUserValue = user;
          return user;
        }),
      );
  }
}
