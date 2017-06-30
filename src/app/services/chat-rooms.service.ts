import { Injectable } from '@angular/core';
import {AuthService, IUser} from "./auth.service";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import 'rxjs/add/operator/map';

export interface IChatRoom {
  lat: number;
  lng: number;
  name: number;
  users: string[];
}

export interface IAFChatMessage {
  text: string;
  author: string;
  date: number;
}

export interface IChatMessage {
  text: string;
  author: string;
  date: number;
  isAuthor: boolean;
  authorDetails: FirebaseObjectObservable<IUser>;
}
@Injectable()
export class ChatRoomsService {

  constructor(
    private af: AngularFire,
    private auth: AuthService
  ) { }

  addChatRoom(lat: number, lng: number, name: string){
    return this.af.database.list('chatrooms')
      .push({
        lat,
        lng,
        name,
        user: [this.auth.user.$key]
      });
  }
  joinChat(chatKey: string): Promise<FirebaseObjectObservable<IChatRoom>> {
    let chat$ = this.af.database.object('chatrooms');
    let promise = new Promise((resolve) => {
      chat$
        .take(1)
        .subscribe((chat) => {
        chat$.update({
          users: Array.from(new Set([...chat.users, this.auth.user.$key]))
        })
        .then(resolve.bind(this, chat$));
        });
    });
    return promise;
  }

  leaveChat(chat$: FirebaseObjectObservable<IChatRoom>) {
    return chat$
      .take(1)
      .toPromise()
      .then((chat) => {
      let users = chat.users.filter(v => v !== this.auth.user.$key);
      if (users.length === 0) {
        return chat$.remove();
      } else {
        return chat$.update({
          users
        });
      }
      });
  }
  getChatRooms(): FirebaseListObservable<IChatRoom[]> {
    return this.af.database.list('chatrooms');
  }
  getChatMessages(chatKey: string): FirebaseListObservable<IChatMessage> {
    return this.af.database.list(`messages-${chatKey}`)
      .map(messages => messages.map((msg) => {
        let parseMessage: IChatMessage = {
          ...msg,
          isAuthor: msg.author === this.auth.user.$key,
          authorDetails: this.getUserInfo(msg.author)
        };
        return parseMessage;
      })) as FirebaseListObservable<IChatMessage>;
  }
  getUserInfo(userKey: string): FirebaseObjectObservable<IUser> {
    return this.af.database.object(`users/${userKey}`);
  }
}
