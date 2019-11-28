import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { FormControl } from '@angular/forms';
import { debounceTime } from "rxjs/operators";
import { NavController } from '@ionic/angular';
import { Observable } from '@mobiscroll/angular/src/js/util/observable';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
 
  constructor(private dataService: DataService, public navCtrl: NavController) {}

  ngOnInit() {
    
  }

}
