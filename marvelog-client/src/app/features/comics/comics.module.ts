import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { ComicFilterPipe } from '@core/pipes/comicFilter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComicsMainComponent } from './comics-main/comics-main.component';
import { ComicsFavoritesComponent } from './comics-favorites/comics-favorites.component';

@NgModule({
  declarations: [
    ComicsMainComponent,
    ComicsFavoritesComponent,
    ComicFilterPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBootstrapIconsModule,
    NgxPaginationModule,
  ],
})
export class ComicsModule { }
