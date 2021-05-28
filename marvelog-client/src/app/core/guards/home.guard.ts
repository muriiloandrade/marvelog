import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class HomeGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): boolean {
    const tokenExpired = this.authService.isTokenExpired();

    if (!tokenExpired && route.routeConfig?.path === 'home') {
      this.router.navigate(['/quadrinhos']);
      return true;
    }

    return true;
  }
}
