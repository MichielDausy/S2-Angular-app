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
  @Input() isDetails = false;

  private map: L.Map = {} as L.Map;
  private centroid: L.LatLngExpression = this.center; 
  private markers: L.FeatureGroup = {} as L.FeatureGroup;

  convertLatitudeToDegreesMinutesSeconds(latitude: number): string {
    const latDirection = latitude >= 0 ? 'N' : 'S';
    const latDegrees = Math.floor(Math.abs(latitude));
    const latMinutes = Math.floor((Math.abs(latitude) - latDegrees) * 60);
    const latSeconds = ((Math.abs(latitude) - latDegrees) * 60 - latMinutes) * 60;

    return `${latDegrees}°${latMinutes}'${latSeconds.toFixed(2)}"${latDirection}`;
  }

  convertLongitudeToDegreesMinutesSeconds(longitude: number): string {
    const lonDirection = longitude >= 0 ? 'E' : 'W';
    const lonDegrees = Math.floor(Math.abs(longitude));
    const lonMinutes = Math.floor((Math.abs(longitude) - lonDegrees) * 60);
    const lonSeconds = ((Math.abs(longitude) - lonDegrees) * 60 - lonMinutes) * 60;

    return `${lonDegrees}°${lonMinutes}'${lonSeconds.toFixed(2)}"${lonDirection}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const previousAnomalies = JSON.stringify(changes['anomalies'].previousValue);
    const currentAnomalies = JSON.stringify(changes['anomalies'].currentValue);

    if(this.isDetails){
      const previousCentroid = JSON.stringify(changes['center'].previousValue);
      const currentCentroid = JSON.stringify(changes['center'].currentValue);

      if(previousCentroid !== currentCentroid) {
        this.map.setView(this.center, this.zoom);
        console.log("center: " + this.center);
      }
    }
  
    if (previousAnomalies !== currentAnomalies) {
      console.log("Anomalies have changed");
      this.updateMarkers();
    }
  }
  
  private initMap(): void {
    if(this.anomalies.length > 1){
      this.map = L.map('map', {
        center: this.centroid,
        zoom: this.zoom
      });
    }
    else{
      this.map = L.map('map', {
        center: [this.anomalies[0].latitude, this.anomalies[0].longitude] as L.LatLngExpression,
        zoom: this.zoom
      });
    }

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    this.updateMarkers();

    tiles.addTo(this.map);

    console.log("center: " + this.center)
  
  }

  updateMarkers(): void {
    this.map.removeLayer(this.markers);
    this.markers = new L.FeatureGroup();
  
    console.log("update markers");
  
    this.anomalies.forEach(anomaly => {
      const marker = L.marker([anomaly.latitude, anomaly.longitude], {
        icon: this.getMarkerIcon(anomaly.anomalyTypeId),
      }).bindPopup("<b>Anomaly </b>" + anomaly.id + "<br><b>Location </b>" + this.convertLongitudeToDegreesMinutesSeconds(anomaly.longitude) +" " + this.convertLatitudeToDegreesMinutesSeconds(anomaly.latitude), { offset: [0, -35] });

      marker.on('mouseover', (e) => {
        marker.openPopup();
      });
      
      marker.on('mouseout', (e) => {
        marker.closePopup();
      });
  
      marker.on('click', () => {
        console.log("click");
        this.router.navigate(['/anomaly/map/details', anomaly.id]);
      });
  
      marker.addTo(this.markers);
    });
  
    this.markers.addTo(this.map);
  }
  
  getMarkerIcon(anomalyTypeId: number): L.Icon {
    let iconUrl = '';
  
    switch (anomalyTypeId) {
      case 1:
        iconUrl = './assets/marker-icon-blue.png'; // Replace with the actual URL or path
        break;
      case 2:
        iconUrl = './assets/marker-icon-grey.png'; // Replace with the actual URL or path
        break;
    }
  
    return new L.Icon({
      iconUrl: iconUrl,
      iconSize: [25, 41], // Adjust the icon size if needed
      iconAnchor: [25 / 2, 41], // Adjust the icon anchor point if needed
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}