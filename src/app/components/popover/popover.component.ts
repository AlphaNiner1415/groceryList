import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, Events, AlertController, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { TestModalPage } from '../../test-modal/test-modal.page';
import { NameListPasserService } from 'src/app/services/name-list-passer.service';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  nameArray: Array<string> = this.nameListPass.getNameArray();
  nameArray2: Array<string> = ["List 1", "List 2", "List 3", "List 4"];
  itemList: any = this.navParams.get('key1');
  itemList2 = [];
  

  constructor(public navParams: NavParams, public popoverController: PopoverController, public alertController: AlertController, public dataService:DataService, public modalController: ModalController, public nameListPass: NameListPasserService) {
    
   }

  ngOnInit() {
    this.nameArray = this.nameListPass.getNameArray();
  }
  popOverWasClicked(){
    this.popoverController.dismiss();
    console.log("closing without passing");
  }
  delegator(listNo: string){
    //console.log("item List: "+ this.itemList);
    this.dataService.getListItems(listNo);
    console.log("dataBase's List of Items: " + this.dataService.listItems);
    if(this.dataService.listItems.length > 0){
      this.dataService.listItems.forEach(element => {
        this.dataService.addToPendingList2(element);
      })
    } else {
      this.itemList.forEach(element => {
        this.itemList2.push(element.id);
      });
      console.log("List Number" + this.nameArray[listNo]);
      this.dataService.postList(this.itemList2, listNo);
    }
    if(this.nameArray[listNo] === this.nameArray2[listNo]){
      this.presentAlertPrompt(listNo);
      
    }
    
  }
  
  async presentAlertPrompt(listNo: string) {
    
    const alert = await this.alertController.create({
      header: 'Do you want to name the List?',
      inputs: [
        {
          name: 'Title',
          placeholder: 'List Title'
        }
      ],
      buttons: [
        {
          text: 'Enter',
          cssClass: 'danger',
          handler: (data) => {
            console.log('Confirm Okay');
            console.log(data.Title);
            if(data.Title != ""){
              this.nameArray[listNo] = data.Title;
            }
            
            console.log(this.nameArray);
            
            this.nameListPass.setWholeArray(this.nameArray);
            this.dismiss(listNo);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.dismiss(listNo);
          }
        }
      ]
    });

    await alert.present();
  }
  dismiss(listNo: any){

    this.popoverController.dismiss();
  }

}
