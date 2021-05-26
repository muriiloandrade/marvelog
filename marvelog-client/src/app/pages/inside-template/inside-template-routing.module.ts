import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsideTemplateComponent } from './inside-template.component';

const routes: Routes = [{
  path: '',
  component: InsideTemplateComponent,
  // children: [{
  //   // path: '',
  // }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsideTemplateRoutingModule { }
