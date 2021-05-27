import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { CharactersModule } from '@features/characters/characters.module';
import { ComicsModule } from '@features/comics/comics.module';
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
    CharactersModule,
    ComicsModule,
  ],
})
export class InsideTemplateModule { }
