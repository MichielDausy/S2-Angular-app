import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Train } from '../Models/train';
import { Anomaly } from '../Models/anomaly';
import {TooltipModule} from 'primeng/tooltip';
import { RouterLink } from '@angular/router';
import { Traintrack } from '../Models/traintrack';
import { Anomalytype } from '../Models/anomalytype';
import { data } from '../Models/mockdata';

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
  @Input() type: string = "all";
  anomalyTypes: Anomalytype[] = [];
  trainAnomalies: Anomaly[] = [];
  $index: any;


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

  getAnomalyTypesId(typeName: string): number | undefined {
    const type = this.anomalyTypes.find(c => c.name.toLowerCase() === typeName.toLowerCase());
    return type?.id;
  }
  getAnomalyTypeById(typeId: number): Anomalytype | undefined {
    const type = this.anomalyTypes.find(c => c.id === typeId);
    return type;
  }

  getColor(item: Anomaly): string{
    const colors = ["","#334155", "#0891b2"];
    const color = colors[item.anomalyTypeId];
    return color;
  }

  navigateToDetails(anomalyId: number) {
    console.log(anomalyId);
  }

  checkType(anomaly: Anomaly): boolean {
    if(this.type === "all"){
      return true;
    }
    else
    {
      return anomaly.anomalyTypeId === this.getAnomalyTypesId(this.type);
    }
  }

  

  ngOnInit(): void {
    this.anomalyTypes = data.anomalyTypes;
    if(this.type === "all"){
      this.trainAnomalies = this.anomalies.filter(a => a.trainId == this.train.id);
    }
    else
    {
      this.trainAnomalies = this.anomalies.filter(a => a.trainId == this.train.id && a.anomalyTypeId == this.getAnomalyTypesId(this.type));
    }
 }

  
}
