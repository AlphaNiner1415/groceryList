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
  itemList: any = this.navParams.get('key1');
  itemList2 = [];
  

  constructor(public navParams: NavParams, public popoverController: PopoverController, public alertController: AlertController, public dataService:DataService, public modalController: ModalController, public nameListPass: NameListPasserService) {
    
   }

  ngOnInit() {
    this.nameArray = this.nameListPass.getNameArray();
  }
  popOverWasClicked(){
    this.popoverController.dismiss();
    console.log(this.itemList);
  }
  delegator(listNo: string){
    this.dataService.getListItems(listNo);
    if(this.dataService.listItems.length > 0){
      this.presentModal(listNo);
    } else {
      this.presentAlertPrompt(listNo);
    }
  }
  async presentModal(listNo) {
    const modal = await this.modalController.create({
      component: TestModalPage,
      componentProps: {listId: listNo, modalTitle: this.nameArray[listNo]}
    });
    return await modal.present();
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
            this.itemList.forEach(element => {
              this.itemList2.push(element.id);
            });
            this.dataService.postList(this.itemList2, listNo);

            this.popoverController.dismiss();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }
      ]
    });

    await alert.present();
  }

}
