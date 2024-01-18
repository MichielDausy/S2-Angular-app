import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Anomaly } from '../Models/anomaly';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { AnomalypageComponent } from '../anomalypage/anomalypage.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges {

  constructor(private router: Router) { }

  @Input() anomalies: Anomaly[] = [];
  @Input() zoom = 9;
  @Input() height = "600px";
  @Input() width = "1200px";
  @Input() center = [50.85045,4.34878] as L.LatLngExpression;
  @Input() updatePending = false;

  private map: L.Map = {} as L.Map;
  private centroid: L.LatLngExpression = this.center; 
  private markers: L.FeatureGroup = {} as L.FeatureGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['anomalies'] && !changes['anomalies'].firstChange) {
      console.log('ngOnChanges called');
      if (this.updatePending) {
        this.updateMarkers();
        this.updatePending = false;
      }
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
    this.map.removeLayer(this.markers);
    this.markers = new L.FeatureGroup();

    console.log("update markers")

    this.anomalies.forEach(anomaly => {
      console.log(anomaly)
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

     marker.addTo(this.markers);
   });
   this.markers.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}