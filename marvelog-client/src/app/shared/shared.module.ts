import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  NgxBootstrapIconsModule, house, book, heart, personCircle,
} from 'ngx-bootstrap-icons';
import { SidebarComponent } from './sidebar/sidebar.component';

const icons = {
  house,
  book,
  heart,
  personCircle,
};

@NgModule({
  declarations: [
    SidebarComponent,
  ],
  exports: [SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxBootstrapIconsModule.pick(icons),
  ],
})
export class SharedModule { }
