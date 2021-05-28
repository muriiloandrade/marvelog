import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ProfileMainComponent } from './profile-main/profile-main.component';

@NgModule({
  declarations: [
    ProfileMainComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule,
  ],
})
export class ProfileModule { }
