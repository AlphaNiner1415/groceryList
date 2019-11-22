import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestModalPageModule } from './test-modal/test-modal.module';
import { PopoverComponent } from './components/popover/popover.component';



@NgModule({
  declarations: [AppComponent, PopoverComponent],
  entryComponents: [PopoverComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, TestModalPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
