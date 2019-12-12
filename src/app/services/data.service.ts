import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Items } from '../models/items.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public listId = {list1:"5de2121cc910add3adee60af", list2: "5de2121dc910add3adee60b0", list3: "5de2121dc910add3adee60b1", list4: "5de2121dc910add3adee60b2"};
  public items = null;
  public items_Non_modified = null;
  public pendingList = [];
  public fiveLastSearched = [];
  private itemsUrl = "https://grocery-list877.herokuapp.com/getallitems";
  private postUrl = "https://grocery-list877.herokuapp.com/updatelist/5de0c75a8993171d2eb4df71";
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
  async postList(idToSend: any){
    console.log(idToSend);
    await this.http.post(this.postUrl, idToSend).toPromise();
  }
  renameCategory(objList){
    switch (objList.category) {
      case 1:
        objList.category = "Vegetables";
        break;
      case 2: 
        objList.category = "Fruits";
        break;
      case 3:
        objList.category = "GBN" 
        break;
      case 4:
        objList.category = "Meat and Poultry";
        break;
      case 5:
        objList.category = "Seafood";
        break;
      case 6:
        objList.category = "Dairy";
        break;
      case 7: 
        objList.category = "Confections";
      case 8:
        objList.category = "Beverages"
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
}

