import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, Events, AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  nameArray: Array<string> = ["List 1", "List 2", "List 3", "List 4"];
  itemList: any = this.navParams.get('key1');
  itemList2 = [];
  

  constructor(public navParams: NavParams, public popoverController: PopoverController, public alertController: AlertController, public dataService:DataService) {
    
   }

  ngOnInit() {}
  popOverWasClicked(){
    this.popoverController.dismiss();
    console.log(this.itemList);
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
            this.nameArray[listNo] = data.Title;
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
