import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestModalPageModule } from './test-modal/test-modal.module';
import { PopoverComponent } from './components/popover/popover.component';
import { IonicGestureConfig } from './IonicGestureConfig';
import { ItemPreviewComponent } from './popover2/item-preview/item-preview.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [AppComponent, PopoverComponent, ItemPreviewComponent],
  entryComponents: [PopoverComponent,ItemPreviewComponent],
  imports: [  
    FormsModule,  
BrowserModule, IonicModule.forRoot(), AppRoutingModule, TestModalPageModule, HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
