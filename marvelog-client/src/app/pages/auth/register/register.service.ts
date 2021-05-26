import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { RegisterDTO } from '@pages/auth/register/register.dto';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterService {
  private baseURL = `${environment.baseUrl}/v1/auth`;

  constructor(private http: HttpClient) {}

  cadastrar(register: RegisterDTO): Observable<unknown> {
    return this.http.post(`${this.baseURL}/register`, register);
  }
}
