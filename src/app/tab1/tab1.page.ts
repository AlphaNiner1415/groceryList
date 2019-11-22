import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public shoppingList = [
    { name: "Banana", price: "50", img: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-1024-80.jpg"}
  ]
  constructor() {}
  itemwasClicked(){
    console.log("Item name was clicked!!!");
  }

}
