import { AfterViewInit, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import 'heatmap.js';
import { Router } from '@angular/router';
import { Anomaly } from '../Models/anomaly';
import { Traintrack } from '../Models/traintrack';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import {  GeoJsonProperties, LineString, FeatureCollection } from 'geojson';
import 'leaflet.markercluster';

declare const HeatmapOverlay: any;

@Component({
  selector: 'app-new-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-map.component.html',
  styleUrls: ['./new-map.component.css'],
})
export class AppComponent implements AfterViewInit {
  constructor(private router: Router) {}

  @Input() anomalies: Anomaly[] = [];
  @Input() height = '600px';
  @Input() width = '1200px';
  @Input() zoom = 9;
  @Input() center = [50.85045, 4.34878] as L.LatLngExpression;
  @Input() trainTracks: Traintrack[] = [];
  @Input() isDetails = false;

  private map: any;
  private centroid: L.LatLngExpression = this.center;
  private heatData: number [][] = [];
  // constant intensity value for all anomalies
  private constantIntensity = 200;
  private trainTrackLayer: L.GeoJSON = {} as L.GeoJSON;
  private markers: L.FeatureGroup = {} as L.FeatureGroup;
  private osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 5,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  });

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

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    if (this.anomalies.length > 1) {
      // Initialising map with center point by using the coordinates
    // Setting initial zoom to 9
    this.map = L.map('map').setView(this.centroid, this.zoom);
    } else {
      this.map = L.map('map').setView([this.anomalies[0].latitude, this.anomalies[0].longitude] as L.LatLngExpression, this.zoom);
    }

    this.osm.addTo(this.map);

    this.setLayers();
  }

  setLayers(): void {
    //Passing data to a layer
    this.heatData = this.anomalies.map((anomaly) => (
      [anomaly.latitude, anomaly.longitude, this.constantIntensity]
    ));
    
    const heatLayer = (L as any).heatLayer(this.heatData, {
      radius: 18,
    });

    this.map.on('zoomend', () => {
      const currentZoom = this.map.getZoom();

       // Remove existing layers
       this.map.eachLayer((layer: any) => {
        if (layer !== this.osm) {
          this.map.removeLayer(layer);
        }
      });
  
      if (currentZoom < 13) {
        // Add the heatmap layer
        heatLayer.addTo(this.map);
      } else {  
        // Add train tracks and markers
        if (this.trainTracks.length > 0) {
          this.initTrainTracks();
        }
        if (this.anomalies.length > 0) {
          this.initMarkers();
        }
      }
    });
  
    // Trigger the initial check
    this.map.fire('zoomend');
  }

  initMarkers(): void {
    this.markers = new L.MarkerClusterGroup();

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
  
      this.markers.addLayer(marker);
    });
    this.map.addLayer(this.markers);
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

    // custom marker element with the SVG image and count badge
    const iconElement = document.createElement('div');
    iconElement.innerHTML = `
      <img src="${iconUrl}" alt="Marker">
      ${anomalyCount > 1 ? `<div class="count-badge" style="position: absolute; bottom: 25px; left: 10px; width: 20px; height: 20px; background-color: red; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px;">${anomalyCount > 100 ? '99+' : anomalyCount.toString()}</div>` : ''}
    `;

    return L.divIcon({
      html: iconElement.innerHTML,
      iconSize: [25, 41],
      iconAnchor: [25 / 2, 41],
      className: 'leaflet-marker-icon',
    });
  }

  initTrainTracks(): void {
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

  ngOnChanges(changes: SimpleChanges): void {
    const previousAnomalies = JSON.stringify(changes['anomalies'].previousValue);
    const currentAnomalies = JSON.stringify(changes['anomalies'].currentValue);

    if(this.isDetails){
      const previousCentroid = JSON.stringify(changes['center'].previousValue);
      const currentCentroid = JSON.stringify(changes['center'].currentValue);

      if(previousCentroid !== currentCentroid) {
        this.map.setView(this.center, this.zoom);
      }
    }

    if (previousAnomalies !== currentAnomalies) {
      this.setLayers();
    }
  }
}
