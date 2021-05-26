import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInModule } from './sign-in/sign-in.module';
import { RegisterModule } from './register/register.module';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SignInModule,
    RegisterModule,
  ],
})
export class AuthModule {}
