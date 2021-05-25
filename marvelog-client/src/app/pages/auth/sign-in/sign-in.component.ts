import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from '@pages/auth/sign-in/sign-in.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './sign-in.component.html',
  providers: [SignInService],
})
export class SignInComponent {
  loginFormGroup: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(11)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: SignInService,
  ) {}

  validationsMessage = {
    numTelefone: [
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

  logar(formValue: { numTelefone: string; password: string }): void {
    Swal.showLoading();
    this.service.login(formValue).subscribe(
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
