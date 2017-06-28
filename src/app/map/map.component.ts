import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input('lat') public lat: number;
  @Input('lan') public lan: number;
  @Output() onClick = new EventEmitter;
  @ViewChild('mapContainer') mapContainer: ElementRef;

  public map: google.maps.Map;
  public markers: google.maps.Marker[] = [];

  constructor() {
  }

  ngOnInit() {


  }
}
