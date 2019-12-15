import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.page.html',
  styleUrls: ['./test-modal.page.scss'],
})
export class TestModalPage implements OnInit {
  modalTitle: string = this.navParams.get('modalTitle');
  modelId: number;
  modalList: any;
  listNo: string = this.navParams.get('listId');
  constructor(private modalController: ModalController,
    private navParams: NavParams, public dataService: DataService) { }

  ngOnInit() {
    this.dataService.getListItems(this.listNo);
    this.getListItems();
  }
  getListItems(){
    this.modalList = this.dataService.listItems;
  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
