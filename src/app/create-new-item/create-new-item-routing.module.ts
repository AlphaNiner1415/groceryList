import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewItemPage } from './create-new-item.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNewItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateNewItemPageRoutingModule {}
