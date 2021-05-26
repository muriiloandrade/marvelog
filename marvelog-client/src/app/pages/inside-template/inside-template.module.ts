import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { InsideTemplateRoutingModule } from './inside-template-routing.module';
import { InsideTemplateComponent } from './inside-template.component';

@NgModule({
  declarations: [
    InsideTemplateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    InsideTemplateRoutingModule,
    SharedModule,
  ],
})
export class InsideTemplateModule { }
