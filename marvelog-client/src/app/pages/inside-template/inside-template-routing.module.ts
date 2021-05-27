import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from '@features/characters/characters-main/characters.component';
import { InsideTemplateComponent } from './inside-template.component';

const routes: Routes = [{
  path: '',
  component: InsideTemplateComponent,
  children: [
    {
      path: 'personagens',
      component: CharactersComponent,
      data: {
        title: 'Página dos Personagens',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsideTemplateRoutingModule { }
