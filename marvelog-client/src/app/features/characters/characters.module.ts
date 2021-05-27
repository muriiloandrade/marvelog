import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from '@features/characters/characters-main/characters.component';
import { RouterModule } from '@angular/router';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { CharactersDetailsComponent } from './characters-details/characters-details.component';

@NgModule({
  declarations: [
    CharactersComponent,
    CharactersDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxBootstrapIconsModule,
    NgxPaginationModule,
  ],
})
export class CharactersModule { }
