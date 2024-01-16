import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Anomaly } from '../Models/anomaly';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Sign } from '../Models/sign';
import {CheckboxModule} from 'primeng/checkbox';

@Component({
  selector: 'app-anomaly-details',
  standalone: true,
  imports: [CommonModule, RouterLink, CheckboxModule],
  templateUrl: './anomaly-details.component.html',
  styleUrls: ['./anomaly-details.component.css']
})
export class AnomalyDetailsComponent implements OnInit{

  constructor(private router: ActivatedRoute){   
  }
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
    //get id from route url
    this.anomalyId = this.router.snapshot.params['id'];
    this.anomaly = this.getAnomalyById(this.anomalyId);
    this.sign = this.getSignbyId(this.anomaly.signId);
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

  generateRandomCoordinate() {
    const minLatitude = -90;
    const maxLatitude = 90;
    const minLongitude = -180;
    const maxLongitude = 180;

    const latitude = Math.random() * (maxLatitude - minLatitude) + minLatitude;
    const longitude = Math.random() * (maxLongitude - minLongitude) + minLongitude;

    return { latitude, longitude };
  }

  getSignbyId(id: number): Sign {
    return this.signs.find(s => s.id == id) as Sign;
  }


  getAnomalyById(id: number): Anomaly {
    return this.anomalies.find(a => a.id == id) as Anomaly;
  }

  signs = [
    {
       id: 1,
       name: "Sign 1",
       photo: "photo1"
    },
    {
       id: 2,
       name: "Sign 2",
       photo: "photo2"
    },
    {
       id: 3,
       name: "Sign 3",
       photo: "photo3"
    },
    {
       id: 4,
       name: "Sign 4",
       photo: "photo4"
    },
    {
       id: 5,
       name: "Sign 5",
       photo: "photo5"
    }
  ] as Sign[];

  anomalies = [
    {
       id: 1,
       timestamp: new Date(),
       ...this.generateRandomCoordinate(),
       photo: "photo1",
       isFixed: false,
       isFalse: false,
       trainId: 1,
       trainTrackId: 1,
       countryId: 1,
       anomalyTypeId: 1,
       signId: 1
   },
   {
      id: 2,
      timestamp: new Date(),
      ...this.generateRandomCoordinate(),
      photo: "photo2",
      isFixed: false,
      isFalse: false,
      trainId: 1,
      trainTrackId: 2,
      countryId: 2,
      anomalyTypeId: 2,
      signId: 2
   },
   {
      id: 3,
      timestamp: new Date(),
      ...this.generateRandomCoordinate(),
      photo: "photo3",
      isFixed: false,
      isFalse: false,
      trainId: 3,
      trainTrackId: 3,
      countryId: 3,
      anomalyTypeId: 3,
      signId: 3
   },
   {
      id: 4,
      timestamp: new Date(),
      ...this.generateRandomCoordinate(),
      photo: "photo4",
      isFixed: false,
      isFalse: false,
      trainId: 4,
      trainTrackId: 4,
      countryId: 4,
      anomalyTypeId: 4,
      signId: 4
   },
   {
      id: 5,
      timestamp: new Date(),
      ...this.generateRandomCoordinate(),
      photo: "photo5",
      isFixed: false,
      isFalse: false,
      trainId: 5,
      trainTrackId: 5,
      countryId: 5,
      anomalyTypeId: 5,
      signId: 5
   }
  ] as Anomaly[];



}
