import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from '@features/characters/characters-main/characters.component';
import { RouterModule } from '@angular/router';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CharacterFilterPipe } from '@core/pipes/characterFilter.pipe';
import { CharactersDetailsComponent } from './characters-details/characters-details.component';
import { CharactersFavoritesComponent } from './characters-favorites/characters-favorites.component';

@NgModule({
  declarations: [
    CharactersComponent,
    CharactersDetailsComponent,
    CharactersFavoritesComponent,
    CharacterFilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxBootstrapIconsModule,
    NgxPaginationModule,
  ],
})
export class CharactersModule { }
