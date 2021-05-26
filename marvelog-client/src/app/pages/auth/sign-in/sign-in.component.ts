import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from '@pages/auth/sign-in/sign-in.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [SignInService],
})
export class SignInComponent {
  loginFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: SignInService,
  ) {
    this.loginFormGroup = this.fb.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  validationsMessage = {
    login: [
      { type: 'required', message: 'Campo obrigatório.' },
      { type: 'minlength', message: 'É necessário ter no mínimo 11 digitos.' },
    ],
    password: [
      { type: 'required', message: 'Campo obrigatório.' },
      {
        type: 'minlength',
        message: 'É necessário que a senha possua no mínimo 6 caractéres.',
      },
    ],
  };

  logar(): void {
    Swal.showLoading();
    this.service.login(this.loginFormGroup.value).subscribe(
      () => {
        Swal.close();
        this.router.navigate(['dashboard']);
      },
      (err: HttpErrorResponse) => {
        Swal.close();
        Swal.fire('Algo deu errado!', err.error.message, 'error');
      },
    );
  }
}
