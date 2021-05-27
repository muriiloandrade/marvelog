import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  NgxBootstrapIconsModule, house, book, heart, personCircle, heartFill,
  search, caretLeftFill, caretRightFill,
} from 'ngx-bootstrap-icons';

const icons = {
  house,
  book,
  heart,
  personCircle,
  heartFill,
  search,
  caretLeftFill,
  caretRightFill,
};

@NgModule({
  declarations: [],
  exports: [NgxBootstrapIconsModule],
  imports: [
    CommonModule,
    RouterModule,
    NgxBootstrapIconsModule.pick(icons),
  ],
})
export class SharedModule { }
