import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  buttonColor: string = "primary";
  items:any;
  constructor(private dataService: DataService) { this.items = this.dataService.items;}
  ngOnInit(){
    
  }
  
  getItems(){
    this.items = this.dataService.items;
    console.log("item successfully get");
    console.log(this.items);
  }
  onSearch(event){
    console.log(event.target.value);
  }
  someAction(){
    this.buttonColor = "dark";
  }

}
