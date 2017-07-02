import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input('lat') public lat: number;
  @Input('lng') public lng: number;
  @Output() onClick = new EventEmitter;
  @ViewChild('mapContainer') mapContainer: ElementRef;

  public map: google.maps.Map;
  public markers: google.maps.Marker[] = [];

  constructor(private ngZone: NgZone) {
  }

  ngOnInit() {
    let latlng = new google.maps.LatLng(this.lat, this.lng);

    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: latlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: true,
      draggable: true,
    });
    this.map.addListener('click', (e) => {
      this.ngZone.run(() => {
        this.onClick.emit(e);
      });
    });
  }

  public addMarker(lat: number, lng: number, onClick: () => {}) {
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: this.map
    });
    marker.addListener('click', () => {
      this.ngZone.run(onClick);
    });

    this.markers.push(marker);
  }
    public clearMarkers() {
    this.markers.forEach((marker) => {
      marker.setMap(null);
      });
    this.markers.length = 0;
    }
}
