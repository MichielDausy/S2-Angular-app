import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Train } from '../Models/train';
import { Anomaly } from '../Models/anomaly';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink } from '@angular/router';
import { Traintrack } from '../Models/traintrack';
import { Service } from '../Service/service';

@Component({
  selector: 'app-anomaly-item',
  standalone: true,
  imports: [CommonModule, TooltipModule, RouterLink],
  templateUrl: './anomaly-item.component.html',
  styleUrls: ['./anomaly-item.component.css']
})


export class AnomalyItemComponent implements OnInit {
  constructor(private service: Service) { }

  @Input() track: Traintrack = { id: 0, name: "", trackGeometry: [] };
  @Input() anomalies: Anomaly[] = [];
  @Input() train: Train = { id: 0, name: "" };
  @Input() selectedDay: string = "";

  ngOnInit(): void {
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

  viewDetails(anomaly: Anomaly) {
    this.service.changeAnomaly(anomaly);
  }
}
