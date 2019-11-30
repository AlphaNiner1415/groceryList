import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { Items } from '../models/items.model';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  buttonColor: string = "primary";
  itemList =[];
  items;
  constructor(private dataService: DataService) {}
  ngOnInit(){ 
  }
  ionViewWillEnter(){
    this.getItems();
  }
  
  async getItems(){
    this.items = await this.dataService.getItems();
    console.log("item successfully get");
  }
  onSearch(event){
    console.log(event.target.value);
  }
  someAction(){
    this.buttonColor = "dark";
  }
  
  addToShoppingList(itemToAdd: any){
    this.dataService.addToPendingList(itemToAdd);
    console.log("Added to Shopping List!");
  }

}
