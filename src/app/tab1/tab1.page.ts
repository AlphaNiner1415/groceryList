import { Component,OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
import { AlertController } from '@ionic/angular';
import { ItemPreviewComponent } from '../popover2/item-preview/item-preview.component';
import { DataService } from '../services/data.service';
import { MallSelectorService } from '../services/mall-selector.service';
import { NameListPasserService } from '../services/name-list-passer.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public shoppingList = []
  dataReturned: any;
  isOkToDelete: boolean =false;
  totalPrice: number = 0;
  sortingBy="";
  myEvent: any;
  itemToUseName: any;
  mallToUse: string;
  sort_is_clicked: boolean = false;
  
  constructor(public popoverController: PopoverController, 
    public alertController:AlertController, public dataService: DataService, public mallSelector: MallSelectorService, public nameListPass: NameListPasserService) { }
  ngOnInit(){

  }
  updateTotalPrice(){
    this.totalPrice = 0;
    this.shoppingList.forEach(element => {
      
      switch (this.mallToUse) {
        case "Big C":
          this.totalPrice=this.totalPrice+element.price.bigc;
          break;
        case "7-11":
          this.totalPrice = this.totalPrice + element.price.seveneleven;
          break;
        case "Tops":
          this.totalPrice = this.totalPrice + element.price.tops;
          break;
        case "Tesco":
          this.totalPrice = this.totalPrice + element.price.tesco;
          break;
        default:
          this.totalPrice = this.totalPrice + element.price.avg_price;
          break;
      }
      console.log(this.totalPrice);
    });
  }
  
  sortBy(whatToSort: any){
    var mall = this.mallToUse
    function priceSort( a, b) {
      switch (mall) {
        case "Big C":
          return b.price.bigc - a.price.bigc;
          break;
        case "Tesco":
          return b.price.tesco-a.price.tesco;
          break;
        case "7-11":
          return b.price.seveneleven-a.price.seveneleven;
          break;
        case "Tops":
          return b.price.tops-a.price.tops;
        default:
          return b.price.avg_price -a.price.avg_price;
          break;
      }
      

    }
    
    if(whatToSort=="name"){
      this.sortingBy="name";
      this.shoppingList.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
      });
      switch (this.sort_is_clicked) {
        case false:
          this.sort_is_clicked = true;
          break;
        case true:
          this.shoppingList.reverse();
          this.sort_is_clicked = false;
        default:
          break;
      }
    
      
    }
    if(whatToSort=="price"){
      this.sortingBy = "price";
      this.shoppingList.sort(priceSort);
      switch (this.sort_is_clicked) {
        case false:
          this.sort_is_clicked = true;
          break;
        case true:
          this.shoppingList.reverse();
          this.sort_is_clicked = false;
        default:
          break;
      }
    }
    
  }
  deleteItem(entryToDelete: any){
    this.presentAlertConfirm(entryToDelete);

  }
  performDeletion(entryToDelete) {
    console.log('entryToDelete', entryToDelete)
    if (this.shoppingList.indexOf(entryToDelete) != -1) {
      this.shoppingList.splice(this.shoppingList.indexOf(entryToDelete), 1);
      console.log("item is deleted!");

    }
  }
  async presentPopover(ev: any) {
    console.log(ev, 'pop Over');
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: {key1: this.shoppingList},
      event: ev,
      cssClass: 'custom-Popover'
     });
    return await popover.present();
    
    
  }
  
  async presentAlertConfirm(entry) {
    this.isOkToDelete == false;
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete the item?!',
      buttons: [
        {
          text: 'Delete',
          cssClass:'danger',
          handler: () => {
            console.log('Confirm Okay');
            this.performDeletion(entry)
            this.isOkToDelete=true;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.isOkToDelete=false;
          }
        } 
      ]
    });

    await alert.present();
  }
  
  doRefresh(event) {
    console.log('Begin async operation');
    
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
    this.updateTotalPrice();
    this.dataService.addToShoppingList(this.shoppingList);
    console.log(this.shoppingList);
  }
  async presentItemPreview(ev:any){
    console.log('Preview',this.myEvent);
    const popover = await this.popoverController.create({
      component: ItemPreviewComponent,
      event: this.myEvent,
      componentProps: this.shoppingList.find(element => element.name== this.itemToUseName),
      cssClass: 'pop-over-style',
    });
    popover.onDidDismiss().then(() => {
      this.mallToUse = this.mallSelector.getValueOfMall();
      this.updateTotalPrice();
    })
    return await popover.present();
  }
  setName(thatName,event){
    this.myEvent = event;
    this.itemToUseName = thatName;
    console.log(this.itemToUseName);
  }
  
}
    
    




