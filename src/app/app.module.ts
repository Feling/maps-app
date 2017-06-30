import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './containers/home/home.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { LoginComponent } from './containers/login/login.component';
import { ChatComponent } from './containers/home/container-components/chat/chat.component';
import { ChatCreateComponent } from './containers/home/container-components/chat-create/chat-create.component';
import { MessageComponent } from './containers/home/container-components/message/message.component';
import {RouterModule} from "@angular/router";
import {routes} from "app/app-routes";
import {AngularFireModule} from "angularfire2";
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "app/services/auth-guard.service";


export const firebaseConfig = {
  apiKey: "AIzaSyCTmkHvgG7Nf2kbPXQExbDzhwhdR9zmjsw",
  authDomain: "chat-40843.firebaseapp.com",
  databaseURL: "https://chat-40843.firebaseio.com",
  projectId: "chat-40843",
  storageBucket: "",
  messagingSenderId: "160287043821"
};

export function loadUser(auth: AuthService) {
  return function () {
    return auth.loadUser();

  }
}

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    LayoutComponent,
    LoginComponent,
    ChatComponent,
    ChatCreateComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
  ],
  providers: [AuthService, AuthGuardService, {
    provide: APP_INITIALIZER,
    useFactory: loadUser,
    deps: [AuthService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
