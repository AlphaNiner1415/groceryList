import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateNewItemPageRoutingModule } from './create-new-item-routing.module';

import { CreateNewItemPage } from './create-new-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateNewItemPageRoutingModule
  ],
  declarations: [CreateNewItemPage]
})
export class CreateNewItemPageModule {}