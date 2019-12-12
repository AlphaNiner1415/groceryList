import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, Events } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  list1_name: string = "List 1";
  list2_name: string = "List 2";
  list3_name: string = "List 3";
  list4_name: string = "List 4";

  constructor(public navParams: NavParams, public popoverController: PopoverController) { }

  ngOnInit() {}
  popOverWasClicked(){
    this.popoverController.dismiss();
  }

}
