import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ProfileService } from '@features/profile/services/profile.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss'],
  providers: [ProfileService, AuthService],
})
export class ProfileMainComponent implements OnInit {
  private emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  profileFG: FormGroup;

  updatePassFG: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ProfileService,
    private authservice: AuthService,
  ) {
    this.profileFG = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/[A-Za-z]+/),
          Validators.minLength(2),
        ],
      ],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      telephone: ['', [Validators.required, Validators.minLength(11)]],
    });

    this.updatePassFG = this.fb.group(
      {
        oldpassword: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: this.compararSenhas },
    );
  }

  ngOnInit() {
    this.getProfileData();
  }

  updateProfileData() {
    if (this.profileFG.valid) {
      Swal.showLoading();
      this.service.patchProfileData(this.profileFG.value).subscribe(
        () => {
          Swal.close();
          Swal.fire({ title: 'Perfil atualizado com sucesso!', icon: 'success' });
        }, (err: HttpErrorResponse) => {
          Swal.fire('Tivemos um problema!', err.error.message, 'error');
        },
      );
    } else {
      Swal.close();
      Swal.fire('Atenção!', 'Algum campo foi preenchido erroneamente!', 'warning');
    }
  }

  updateProfilePass() {
    if (this.profileFG.valid) {
      Swal.showLoading();
      this.service.patchPass(this.updatePassFG.value).subscribe(
        () => {
          Swal.close();
          Swal.fire({ title: 'Senha atualizada com sucesso!', icon: 'success' });
          this.authservice.logout();
        }, (err: HttpErrorResponse) => {
          Swal.fire('Tivemos um problema!', err.error.message, 'error');
        },
      );
    } else {
      Swal.close();
      Swal.fire('Atenção!', 'Algum campo foi preenchido erroneamente!', 'warning');
    }
  }

  getProfileData() {
    this.service.getProfileData().subscribe(
      (resp) => {
        this.profileFG.controls.name.setValue(resp.str_name_usr);
        this.profileFG.controls.email.setValue(resp.str_email_usr);
        this.profileFG.controls.telephone.setValue(resp.num_telephone_usr);
      }, (err: HttpErrorResponse) => {
        Swal.fire('Tivemos um problema!', err.error.message, 'error');
      },
    );
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
