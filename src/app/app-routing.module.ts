import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'create-new-item',
    loadChildren: () => import('./create-new-item/create-new-item.module').then( m => m.CreateNewItemPageModule)
  },
  {
    path: 'test-modal',
    loadChildren: () => import('./test-modal/test-modal.module').then( m => m.TestModalPageModule)
  }
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
