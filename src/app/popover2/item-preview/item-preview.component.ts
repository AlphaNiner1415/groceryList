import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.scss'],
})
export class ItemPreviewComponent implements OnInit {
  previewComponentArray = [];
  constructor(public navParams: NavParams, public popoverController: PopoverController) {}
  name = this.navParams.get('name');
  price = this.navParams.get('price');
  img = this.navParams.get('img');
  ngOnInit() {}

  componentGetData(){
    this.previewComponentArray.push(this.name);
  }
  exit(){
    this.popoverController.dismiss();
  }

}
