import { Component,OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TestModalPage } from '../test-modal/test-modal.page';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public shoppingList = [
    { name: "Banana", price: "50", img: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-1024-80.jpg"},
    { name: "Mango", price: "50"}
  ]
  dataReturned: any;
  
  constructor(public modalController: ModalController, public popoverController: PopoverController) {}
  ngOnInit(){

  }
  itemwasClicked(){
    console.log("Item name was clicked!!!");
  }
  deleteItem(entryToDelete: any){
    if (this.shoppingList.indexOf(entryToDelete) != -1) {
      this.shoppingList.splice(this.shoppingList.indexOf(entryToDelete), 1);
      console.log("item is deleted!");
    }
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: TestModalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
    
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
    });
    return await popover.present();
  
  }
}
