import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceFinderService {
myList=[]
  constructor() { }
  sentList(listToReceive: any){
    listToReceive.forEach(element => {
      this.myList.push(element);
    });
  }
  findPrice(mallToFind: string){
    this.myList.forEach(element => {
      if(mallToFind == "Big C"){
        return element.price.big_c;
      }
      if(mallToFind == "Tesco"){
        return element.price.tesco;
      }
      if(mallToFind == "Tops"){
        return element.price.tops;
      }
      if(mallToFind == "Seven"){
        return element.price.seven;
      }
    });
  }
}
