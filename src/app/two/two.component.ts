import { Component, OnInit, AfterViewInit } from '@angular/core';
import { icon, Marker } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.css']
})
export class TwoComponent implements OnInit, AfterViewInit {
  title = 'map-test';
  public lat: string;
  public lon: string;
  private marker;

  ngAfterViewInit(): void {
    this.initMap();
  }

  constructor() { 
    this.lat = "";
    this.lon = "";
  }

  ngOnInit(): void {
  }

  private initMap(): void {
    var map;
    var tiles;

    map = new L.map('map').locate({setView: true, maxZoom: 17});

    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;

    tiles = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                              {
                                maxZoom: 19,
                                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                              }
                            ).addTo(map);

    map.once('locationfound',
                    e => {
                            this.marker = new L.marker([e.latlng.lat, e.latlng.lng], {draggable:'true'}).addTo(map);
                            this.lat = e.latlng.lat;
                            this.lon = e.latlng.lng;
                    }
                  )
  }

  mouseUp(){
  let location = this.marker.getLatLng();
  this.lat = location.lat;
  this.lon = location.lng;
  }
}
