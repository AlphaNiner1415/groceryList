import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  items =[0,1,2,3,4,5,6];
  constructor() {}
  squareclick(){
    console.log("Square number 2 was clicked!!!");
  }
  card2Clicked(){
    console.log("Card 2 was clicked");
  }

}
