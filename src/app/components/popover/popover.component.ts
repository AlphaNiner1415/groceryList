import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, Events } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(public navParams: NavParams, public popoverController: PopoverController) { }

  ngOnInit() {}
  popOverWasClicked(){
    this.popoverController.dismiss();
  }

}
