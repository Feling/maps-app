import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './containers/home/home.component';
import { LayoutComponent } from './containers/containers/layout/layout.component';
import { LoginComponent } from './containers/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    LayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
