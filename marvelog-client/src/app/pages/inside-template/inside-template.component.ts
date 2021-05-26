import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { IconNamesEnum } from 'ngx-bootstrap-icons';

@Component({
  templateUrl: './inside-template.component.html',
  styleUrls: ['./inside-template.component.scss'],
})
export class InsideTemplateComponent {
  iconNames = IconNamesEnum;

  username: string;

  constructor(private authService: AuthService) {
    const decoded = this.authService.getDecodedToken();
    this.username = decoded?.user;
  }

  logout() {
    this.authService.logout();
  }
}
