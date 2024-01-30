import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Anomaly } from '../Models/anomaly';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { Traintrack } from '../Models/traintrack';
import {  GeoJsonProperties, LineString, FeatureCollection } from 'geojson';
import 'leaflet.heat/dist/leaflet-heat.js'

declare const HeatmapOverlay: any;

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
  @Input() trainTracks: Traintrack[] = [];
  @Input() zoom = 9;
  @Input() height = "600px";
  @Input() width = "1200px";
  @Input() center = [50.85045,4.34878] as L.LatLngExpression;
  @Input() isDetails = false;

  private map: L.Map = {} as L.Map;
  private centroid: L.LatLngExpression = this.center; 
  private markers: L.FeatureGroup = {} as L.FeatureGroup;
  private trainTrackLayer: L.GeoJSON = {} as L.GeoJSON;

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
    if (this.trainTracks.length > 0) {
      this.updateTrainTracks();
    }

    tiles.addTo(this.map);

    // Setting up heat layer config
    const heatLayerConfig = {
      "radius": 5,
      "maxOpacity": .8,
      "scaleRadius": true,
      // property below is responsible for colorization of heat layer
      "useLocalExtrema": true,
      // here we need to assign property value which represent lat in our data
      latField: 'lat',
      // here we need to assign property value which represent lng in our data
      lngField: 'lng',
      // here we need to assign property value which represent valueField in our data
      valueField: 'count'
    };

    // Initialising heat layer and passing config
    const heatmapLayer = new HeatmapOverlay(heatLayerConfig);

    //Passing data to a layer
    heatmapLayer.setData(this.getLocations());

    //Adding heat layer to a map
    heatmapLayer.addTo(this.map);
  
  }

  getLocations(): any[] {
    return this.anomalies.map(anomaly => ({
      lat: anomaly.latitude,
      lng: anomaly.longitude,
    }));
  }

  updateMarkers(): void {
    this.map.removeLayer(this.markers);
    this.markers = new L.FeatureGroup();
  
    this.anomalies.forEach(anomaly => {
      const marker = L.marker([anomaly.latitude, anomaly.longitude], {
        icon: this.getMarkerIcon(anomaly.anomalyTypeId, anomaly.count),
      }).bindPopup("<b>Anomaly </b>" + anomaly.id + "<br><b>Location </b>" + this.convertLatitudeToDegreesMinutesSeconds(anomaly.latitude) + " " + this.convertLongitudeToDegreesMinutesSeconds(anomaly.longitude), { offset: [0, -35] });

      marker.on('mouseover', (e) => {
        marker.openPopup();
      });
      
      marker.on('mouseout', (e) => {
        marker.closePopup();
      });
  
      marker.on('click', () => {
        console.log("click");
        this.router.navigate(['/anomaly/details', anomaly.id]);
      });
  
      marker.addTo(this.markers);
    });
  
    this.markers.addTo(this.map);
  }
  
  getMarkerIcon(anomalyTypeId: number, anomalyCount: number): L.DivIcon {
    let iconUrl = '';
  
    switch (anomalyTypeId) {
      case 1:
        iconUrl = './assets/marker-blue.svg';
        break;
      case 2:
        iconUrl = './assets/marker-grey.svg';
        break;
    }

    // Create a custom marker element with the SVG image and count badge
    const iconElement = document.createElement('div');
    iconElement.innerHTML = `
      <img src="${iconUrl}" alt="Marker">
      ${anomalyCount > 1 ? `<div class="count-badge">${anomalyCount > 100 ? '99+' : anomalyCount.toString()}</div>` : ''}
    `;

    // Define styles for the count badge
    const countBadgeStyles = `
    position: absolute;
    bottom: 25px;
    left: 10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 5px;
    font-size: 12px;
  `;

    // Apply styles to the count badge
    const countBadge = iconElement.querySelector('.count-badge');
    if (countBadge) {
      countBadge.setAttribute('style', countBadgeStyles);
    }
  
    return L.divIcon({
      html: iconElement.innerHTML,
      iconSize: [25, 41],
      iconAnchor: [25 / 2, 41],
      className: 'leaflet-marker-icon', // Add your CSS class here if needed
    });
  }

  updateTrainTracks(): void {
    this.map.removeLayer(this.trainTrackLayer);

    const trainTrackGeoJSON: FeatureCollection<LineString, GeoJsonProperties> = {
      type: 'FeatureCollection',
      features: this.trainTracks.map(trainTrack => ({
        type: 'Feature',
        properties: {
          name: trainTrack.name,
          anomalyCount: this.getAnomalyCount(trainTrack.id),
        },
        geometry: {
          type: 'LineString',
          coordinates: trainTrack.trackGeometry.map(coord => [coord.longitude, coord.latitude]),
        },
      })),
    };

    this.trainTrackLayer = L.geoJSON(trainTrackGeoJSON, {
      style: (feature) => ({
        color: 'grey',
        weight: 3, // Initial width
      }),
      onEachFeature: (feature, layer) => {
        layer.on('mouseover', (e) => {
          (layer as L.Path).setStyle({
            color: 'green',
            weight: 10, // Highlighted width
          });
          const popupContent = `<b>${feature.properties.name}</b></br><b># anomalies</b> ${feature.properties.anomalyCount}`;
          layer.bindPopup(popupContent, { offset: [0, -2], autoPan: false }).openPopup();
        });
  
        layer.on('mouseout', (e) => {
          (layer as L.Path).setStyle({
            color: 'grey',
            weight: 3, // Reset to initial width
          });
          layer.closePopup();
        });
      }
    });

    this.trainTrackLayer.addTo(this.map);
  }

  getAnomalyCount(trainTrackId: number): number {
    return this.anomalies.filter(anomaly => anomaly.trainTrackId === trainTrackId).length;
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}