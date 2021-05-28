import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { RegisterService } from '@pages/auth/register/register.service';
import { SignInService } from '@pages/auth/sign-in/sign-in.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService, SignInService],
})
export class RegisterComponent {
  registerFormGroup: FormGroup;

  private emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private service: RegisterService,
    private signInService: SignInService,
  ) {
    this.registerFormGroup = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/[A-Za-z]+/),
          Validators.minLength(2),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/[A-Za-z]+/),
          Validators.minLength(2),
        ],
      ],
      passwords: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        },
        { validators: this.compararSenhas },
      ),
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      telephone: ['', [Validators.required, Validators.minLength(11)]],
    });
  }

  async cadastrar() {
    if (this.registerFormGroup.valid) {
      Swal.showLoading();
      const login = this.registerFormGroup?.get('username')?.value;
      const password = this.registerFormGroup.get('passwords.password')?.value;
      const {
        email, name, telephone, username,
      } = this.registerFormGroup.value;
      this.service.cadastrar({
        email, name, telephone, username, password,
      }).subscribe(
        () => {
          this.signInService.login({ login, password }).subscribe((res) => {
            this.registerFormGroup.reset();
            this.authService.setSession(res);
            Swal.close();
            this.router.navigate(['/quadrinhos']);
          });
        }, (err: HttpErrorResponse) => {
          Swal.fire('Tivemos um problema!', err.error.message, 'error');
        },
      );
    } else {
      Swal.close();
      Swal.fire('Atenção!', 'Código incorreto, tente novamente!', 'warning');
    }
  }

  compararSenhas(fb: AbstractControl) {
    const passwordControl = fb.get('password');
    const confirmPasswordControl = fb.get('confirmPassword');

    if (confirmPasswordControl?.errors == null || 'mismatch' in confirmPasswordControl.errors) {
      if (passwordControl?.value !== confirmPasswordControl?.value) {
        passwordControl?.setErrors({ mismatch: true });
        confirmPasswordControl?.setErrors({ mismatch: true });
      } else {
        passwordControl?.setErrors(null);
        confirmPasswordControl?.setErrors(null);
      }
    }
  }
}
