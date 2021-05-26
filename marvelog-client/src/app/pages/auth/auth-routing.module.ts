import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '@pages/auth/register/register.component';
import { SignInComponent } from '@pages/auth/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: SignInComponent,
    data: {
      title: 'Página de Login',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Página de Cadastro',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
