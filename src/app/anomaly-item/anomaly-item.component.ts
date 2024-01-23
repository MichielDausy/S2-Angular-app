import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Train } from '../Models/train';
import { Anomaly } from '../Models/anomaly';
import {TooltipModule} from 'primeng/tooltip';
import { RouterLink } from '@angular/router';
import { Traintrack } from '../Models/traintrack';

@Component({
  selector: 'app-anomaly-item',
  standalone: true,
  imports: [CommonModule, TooltipModule, RouterLink],
  templateUrl: './anomaly-item.component.html',
  styleUrls: ['./anomaly-item.component.css']
})


export class AnomalyItemComponent implements OnInit{

  @Input() train : Train = {id: 0, name: ""};
  @Input() anomalies : Anomaly[] = [];
  @Input() tracks: Traintrack[] = [];
  @Input() selectedTrain: number = -1;
  trainAnomalies: Anomaly[] = [];


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

  getTrackNameForAnomalies(): string {
    if (this.selectedTrain !== -1) {
      const trackId = this.anomalies.find(a => a.trainId === this.selectedTrain)?.trainTrackId;
      const track = this.tracks.find(t => t.id === trackId);
      console.log("track: " + track);
      return track ? track.name : 'Unknown Track';
    } else {
      return 'No Anomalies';
    }
  }

  navigateToDetails(anomalyId: number) {
    console.log(anomalyId);
  }


  ngOnInit(): void {
    this.trainAnomalies = this.anomalies;
 }
// ngOnInit(): void {
//   console.log('All Anomalies:', this.anomalies);

//   const trainTrack = this.tracks.find(track => track.id === this.train.id);

//   if (trainTrack) {
//     console.log('Train ID:', this.train.id);
//     console.log('Train Track ID:', trainTrack.id);

//     this.trainAnomalies = this.anomalies.filter(a => a.trainTrackId === trainTrack.id);
//   } else {
//     console.error('Train track not found for train ID: ', this.train.id);
//   }
// }  
}
