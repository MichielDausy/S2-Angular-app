import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Anomaly } from '../Models/anomaly';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Sign } from '../Models/sign';
import {CheckboxModule} from 'primeng/checkbox';
import { Train } from '../Models/train';
import { Country } from '../Models/country';
import { data } from '../Models/mockdata';
import { MapComponent } from '../map/map.component';
import { Anomalytype } from '../Models/anomalytype';
import { Traintrack } from '../Models/traintrack';
import { Service } from '../Service/service';

@Component({
  selector: 'app-anomaly-map-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CheckboxModule, MapComponent],
  templateUrl: './anomaly-map-details-page.component.html',
  styleUrl: './anomaly-map-details-page.component.css'
})
export class AnomalyMapDetailsPageComponent implements OnInit{
  
  constructor(private router: ActivatedRoute, private service: Service){   }

  center = [0,0] as L.LatLngExpression;
  anomaly : Anomaly = {
    id: 0,
    timestamp: new Date(),
    latitude: 0,
    longitude: 0,
    photo: "",
    isFixed: false,
    isFalse: false,
    trainId: 0,
    trainTrackId: 0,
    countryId: 0,
    anomalyTypeId: 0,
    signId: 0
  };

  sign : Sign = {
    id: 0,
    name: "",
    photo: ""
  };

  anomalyId: number = 0;

  ngOnInit(): void {
    this.anomalyId = this.router.snapshot.params['id'];
    this.service.getAnomalyById(this.anomalyId).subscribe(anomaly => {
      this.anomaly = anomaly;
      this.center = [this.anomaly.latitude, this.anomaly.longitude] as L.LatLngExpression;
    });
  }


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

  markAnomalyAsFixedById(id: number): void {
    if(confirm("Are you sure this anomaly is fixed?")) {
      this.service.markAnomalyAsFixedById(id).subscribe(anomaly => {
        this.anomaly = anomaly;
      });
    }
  }

  markAnomalyAsFalseById(id: number): void {
    if(confirm("Are you sure this anomaly is false?")) {
      this.service.markAnomalyAsFalseById(id).subscribe(anomaly => {
        this.anomaly = anomaly;
      });
    }
  } 
}
