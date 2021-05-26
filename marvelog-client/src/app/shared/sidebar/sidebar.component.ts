import { Component } from '@angular/core';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
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
