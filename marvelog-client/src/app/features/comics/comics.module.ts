import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { ComicsMainComponent } from './comics-main/comics-main.component';

@NgModule({
  declarations: [
    ComicsMainComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxBootstrapIconsModule,
    NgxPaginationModule,
  ],
})
export class ComicsModule { }
