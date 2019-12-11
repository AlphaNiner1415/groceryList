import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { Items } from '../models/items.model';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  SelectValue: string;
  buttonColor: string = "primary";
  itemList =[];
  items = [];
  items2 = [];
  numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]; // [0,1,2,3,4]
  constructor(private dataService: DataService) {}
  ngOnInit(){ 
  }
  ionViewWillEnter(){
    this.getItems();
  }
  
  async getItems(){
    
    this.items = await this.dataService.getItems();
    console.log("item successfully get");
    console.log(this.items.length);
    this.items2= this.items;
  }
  onSearch(event){
    this.items2 = this.items;
    if(event.target.value === ""){
      this.items2 = this.items;
    }
    this.items2 = this.dataService.filterItems(this.items, event.target.value);
    console.log(this.items2.length);
  }
  someAction(){
    this.buttonColor = "dark";
  }
  
  addToMyList(itemToAdd: any){
    this.dataService.addToPendingList(itemToAdd);
    console.log("Added to Shopping List!");
  }
  segmentChanged(){
    console.log("The Segment has changed it's value");
  }
  categorySort(param:any){
    if(param === ""){
      this.items2 = this.items;
    }
    this.items2 = this.dataService.filterCategory(this.items, param);
  }

}
