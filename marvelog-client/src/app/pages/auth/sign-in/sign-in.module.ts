import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in.component';

@NgModule({
  declarations: [
    SignInComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
})
export class SignInModule { }
