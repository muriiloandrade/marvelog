import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersDetailsComponent } from '@features/characters/characters-details/characters-details.component';
import { CharactersFavoritesComponent } from '@features/characters/characters-favorites/characters-favorites.component';
import { CharactersComponent } from '@features/characters/characters-main/characters.component';
import { ComicsFavoritesComponent } from '@features/comics/comics-favorites/comics-favorites.component';
import { ComicsMainComponent } from '@features/comics/comics-main/comics-main.component';
import { ProfileMainComponent } from '@features/profile/profile-main/profile-main.component';
import { InsideTemplateComponent } from './inside-template.component';

const routes: Routes = [{
  path: '',
  component: InsideTemplateComponent,
  children: [
    {
      path: 'personagem/:id',
      component: CharactersDetailsComponent,
      data: {
        title: 'Página de Detalhos do Personagens',
      },
    },
    {
      path: 'personagens',
      component: CharactersComponent,
      data: {
        title: 'Página dos Personagens',
      },
    },
    {
      path: 'personagens-favoritos',
      component: CharactersFavoritesComponent,
      data: {
        title: 'Página dos Personagens Favoritos',
      },
    },
    {
      path: 'quadrinho/:id',
      component: ComicsMainComponent,
      data: {
        title: 'Página de Detalhes do Quadrinho',
      },
    },
    {
      path: 'quadrinhos',
      component: ComicsMainComponent,
      data: {
        title: 'Página dos Quadrinhos',
      },
    },
    {
      path: 'quadrinhos-favoritos',
      component: ComicsFavoritesComponent,
      data: {
        title: 'Página dos Quadrinhos Favoritos',
      },
    },
    {
      path: 'profile',
      component: ProfileMainComponent,
      data: {
        title: 'Página do perfil do usuário',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsideTemplateRoutingModule { }
