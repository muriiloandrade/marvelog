import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { HomeGuard } from '@core/guards/home.guard';
import { HomeComponent } from '@pages/home/home.component';
import { AuthComponent } from 'src/app/pages/auth/auth.component';
import { AuthModule } from 'src/app/pages/auth/auth.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [HomeGuard],
    component: HomeComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: (): Promise<AuthModule> => import('@pages/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/inside-template/inside-template.module').then((m) => m.InsideTemplateModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
