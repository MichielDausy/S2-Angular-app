import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Anomaly } from '../Models/anomaly';
import * as L from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  constructor(private router: Router) { }

  @Input() anomalies: Anomaly[] = [];
  @Input() zoom = 9;
  @Input() height = "600px";
  @Input() width = "1200px";
  @Input() center = [50.85045,4.34878] as L.LatLngExpression;

  private map: L.Map = {} as L.Map;
  private centroid: L.LatLngExpression = this.center; 

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['anomalies'] && !changes['anomalies'].firstChange) {
      this.updateMarkers();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: this.zoom
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    this.updateMarkers();

    tiles.addTo(this.map);
  
  }

  updateMarkers(): void {
    this.map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    this.anomalies.forEach(anomaly => {
      const marker = L.marker([anomaly.latitude, anomaly.longitude]);

      marker.on('click', () => {
        console.log("click")
        this.router.navigate(['/mapdetails', anomaly.id]);
      });

      let color = 'black';

      switch (anomaly.anomalyTypeId) {
       case 1:
         color = '#485569';
         break;
       case 2:
         color = '#1e748f';
         break;
     }


      const style = `
       background-color: ${color};
       height: 15px;
       width: 15px;
       border-radius: 50%;
       display: inline-block;
       `;

      marker.setIcon(L.divIcon({
         className: 'my-div-icon',
         html: `<span style="${style}" />`
       }));

     marker.addTo(this.map);
   });
  }

  ngOnInit(): void {
    this.initMap();
  }

}
