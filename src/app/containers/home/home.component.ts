import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public initialCoord = {
    lat: 55.751244,
    lng: 37.618425
  };
  public activeTab = 'chat';
  constructor() { }

  ngOnInit() {
  }

}
