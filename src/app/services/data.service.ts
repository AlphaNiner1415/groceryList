import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Items } from '../models/items.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public listId = ["5de2121cc910add3adee60af","5de2121dc910add3adee60b0","5de2121dc910add3adee60b1","5de2121dc910add3adee60b2"];
  public items = null;
  public items_Non_modified = null;
  public listItems: any = [];
  public pendingList = [];
  public pendingList2 = [];
  public fiveLastSearched = [];
  private itemsUrl = "https://grocery-list877.herokuapp.com/getallitems";
  private postUrl = "https://grocery-list877.herokuapp.com/updatelist/";
  private getListUrl = "https://grocery-list877.herokuapp.com/getlistitems/"
  constructor(public http: HttpClient) {}

  filterItems(items2, searchTerm) {
    return items2.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  filterCategory(items2, category) {
    return items2.filter(item => {
      return item.category.toLowerCase().indexOf(category.toLowerCase()) > -1;
    });
  }

  async getListItems(listNo){
    this.listItems = await this.http.get(this.getListUrl+this.listId[listNo]).toPromise();
    this.listItems.forEach(element => {
      element.id = element._id;
      delete element._id;
      element.img = element.pic_link;
      delete element.pic_link;
      this.renameCategory(element);
    });
    console.log(this.listItems);
  }
  async getItems(){
    if (this.items === null){
      console.log('Getting Item!');
      let obj = this;
        obj.items = await obj.http.get<Items>(obj.itemsUrl).toPromise();
        obj.items_Non_modified = obj.items;
        obj.items.forEach(element => {
          element.id = element._id;
          delete element._id;
          element.img = element.pic_link;
          delete element.pic_link;
          obj.renameCategory(element);
        });
      
    }
    return this.items;
    
  }
  async postList(idToSend: any,listNo){
    console.log("id that we're sending: " + idToSend);
    await this.http.post(this.postUrl+this.listId[listNo], idToSend).toPromise();
    
  }
  renameCategory(item){
    switch (item.category) {
      case 1:
        item.category = "Vegetables";
        break;
      case 2: 
        item.category = "Fruits";
        break;
      case 3:
        item.category = "GBN" 
        break;
      case 4:
        item.category = "Meat and Poultry";
        break;
      case 5:
        item.category = "Seafood";
        break;
      case 6:
        item.category = "Dairy";
        break;
      case 7: 
        item.category = "Confections";
        break;
      case 8:
        item.category = "Beverages"
      default:
        break;
    }
  }
  addToPendingList(itemToAdd){
    this.pendingList.push(itemToAdd);
    console.log(itemToAdd);
  }
  addToShoppingList(shoppingList: any){
    this.pendingList.forEach(element => {
      if (shoppingList.indexOf(element) == -1){
        shoppingList.push(element);
      }
    });
    this.pendingList = [];
  }
  addToPendingList2(itemToAdd){
    this.pendingList2.push(itemToAdd);
  }
  addToShoppingList2(shoppingList: any){
    if(this.pendingList2.length> 0 ){
      shoppingList = this.pendingList2;
      this.pendingList2 = [];
    }
  }
}

