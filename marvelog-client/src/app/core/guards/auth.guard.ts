import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): boolean {
    const tokenExpired = this.authService.isTokenExpired();
    if (!tokenExpired) {
      return true;
    }

    this.authService.logout();
    return false;
  }
}
