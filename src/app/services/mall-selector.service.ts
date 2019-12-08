import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MallSelectorService {
  mallValue: string;
  constructor() { }
  setValueOfMall(params: any){
    this.mallValue = params;
  };
  getValueOfMall(){
    return this.mallValue;
  }

}
