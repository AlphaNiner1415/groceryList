import { Component,OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TestModalPage } from '../test-modal/test-modal.page';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
import { AlertController } from '@ionic/angular';
import { ItemPreviewComponent } from '../popover2/item-preview/item-preview.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public shoppingList = [
    { name: "Banana", price: 50, img: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-1024-80.jpg"},
    { name: "Mango", price: 30},
    { name: "Apple", price: 80}
  ]
  dataReturned: any;
  isOkToAdd: boolean =false;
  totalPrice: number = 0;
  sortingBy="";
  myEvent: any;
  itemToUseName: any;
  constructor(public popoverController: PopoverController, 
    public alertController:AlertController,
    public modalController: ModalController) {}
  ngOnInit(){

  }
  updateTotalPrice(){
    this.totalPrice = 0;
    this.shoppingList.forEach(element => {
      this.totalPrice = this.totalPrice+ element.price;
      console.log(this.totalPrice);
    });
  }
  sortBy(whatToSort: any){
    if(whatToSort=="name"){
      this.sortingBy="name";
      this.shoppingList.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
      });
    }
    if(whatToSort=="price"){
      this.sortingBy = "price";
      this.shoppingList.sort(function (a, b) {
        return b.price - a.price;
      });
    }
    
  }
  deleteItem(entryToDelete: any){
    if (this.shoppingList.indexOf(entryToDelete) != -1) {
      this.shoppingList.splice(this.shoppingList.indexOf(entryToDelete), 1);
      console.log("item is deleted!");
      
    }

  }
  async presentPopover(ev: any) {
    console.log(ev, 'pop Over');
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
     });
    return await popover.present();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.isOkToAdd=true;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        } 
      ]
    });

    await alert.present();
  }
  commenceAddingToCart(){
    if(this.isOkToAdd){
      this.shoppingList.splice(0,this.shoppingList.length);
    }
  }
  doRefresh(event) {
    console.log('Begin async operation');
    
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
    this.updateTotalPrice();
  }
  async presentItemPreview(ev:any){
    console.log('Preview',this.myEvent);
    const popover = await this.popoverController.create({
      component: ItemPreviewComponent,
      event: this.myEvent,
      componentProps: this.shoppingList.find(element => element.name== this.itemToUseName)
    });
    return await popover.present();
  }
  setName(thatName,event){
    this.myEvent = event;
    this.itemToUseName = thatName;
    console.log(this.itemToUseName);
  }
  
}
    
    




