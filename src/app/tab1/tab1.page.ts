import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public shoppingList = [
    { name: "Banana", price: "50"}
  ]
  constructor() {}
  itemwasClicked(){
    console.log("Item name was clicked!!!");
  }

}
