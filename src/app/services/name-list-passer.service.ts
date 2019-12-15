import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NameListPasserService {
  nameArray: Array<string> = ["List 1", "List 2", "List 3", "List 4"];
  constructor() { }
  getNameArray(){
    return this.nameArray;
  }
  setNameArray(itemToSet: string, index: any){
    this.nameArray[index] = itemToSet;
  }
  setWholeArray(array: Array<string>){
    this.nameArray = array;
  }

}
