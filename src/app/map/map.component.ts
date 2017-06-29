import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, NgZone} from '@angular/core';
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

  constructor(
    private ngZone: NgZone
  ) {}

  /**
   * onInit
   */
  ngOnInit() {
    let latlan = new google.maps.LatLng(this.lat, this.lan);
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: latlan,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: true,
      draggable: true,
    });
    this.map.addListener('click' , (e) => {
      this.ngZone.run(() => {
        this.onClick.emit(e);
      });
    });
  }

  /**
   *
   * @param lat
   * latitude of marker
   * @param lan
   * lantitude og marker
   * @param onClick
   * push marker to markers array
   */
  public addMarker (lat: number, lan: number, onClick: () => {}) {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lan),
        map: this.map
      });
      marker.addListener('click', (e) => {
        this.ngZone.run(onClick);
      });

    this.markers.push(marker);
  }

  /**
   * clear all markers
   */
  public  clearMarkers () {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
    this.markers.length = 0;
  }

}
