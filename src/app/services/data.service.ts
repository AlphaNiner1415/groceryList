import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public items = [
    { name: "Banana", price: 50, img: "https://ripeme.com/wp-content/uploads/RF-10012-RIPE-ORGANIC-ORGANIC-BANANAS.jpg" },
    { name: "Mango", price: 60, img: "https://cdn.shopify.com/s/files/1/0076/4339/8233/products/yellow-mango.jpg?v=1544861632" },
    { name: "Apple", price: 30, img: "https://5.imimg.com/data5/YY/EN/MY-8155364/fresh-apple-500x500.jpg" }
  ];
  public fiveLastSearched = [];

  constructor() {
    
  }

  filterItems(items, searchTerm) {
    return items.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}

