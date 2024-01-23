import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnomalyItemComponent } from '../anomaly-item/anomaly-item.component';
import { Anomaly } from '../Models/anomaly';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { data } from '../Models/mockdata';
import {CalendarModule} from 'primeng/calendar';
import { Train } from '../Models/train';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-history-map',
  standalone: true,
  imports: [CommonModule, AnomalyItemComponent, FormsModule, MapComponent, RouterLink, CalendarModule],
  templateUrl: './history-map.component.html',
  styleUrl: './history-map.component.css'
})

export class HistoryMapComponent {
  constructor(private router: Router) { }

  selectedFilter: string = '';
  selectedTrain: number = -1;
  selectedDay: string | null = null;
  rangeDates: Date[] = [new Date(), new Date()];
  
  displayList = false;
  center = [50.85045,4.34878] as L.LatLngExpression;

  // Voeg deze eigenschap toe aan je component
filteredAnomalies: Anomaly[] = [];

// Update de filteredAnomalies eigenschap wanneer de geselecteerde trein of dag verandert
onTrainDayChange(selectedTrainId: number, selectedDay: string): void {
    this.filteredAnomalies = this.getAllAnomaliesByTrainAndDay(selectedTrainId, selectedDay);
}

  countryAnomalies= [{
    id: 1,
    timestamp: new Date(),
    longitude: 0,
    latitude: 0,
    photo: "photo1",
    isFixed: false,
    isFalse: false,
    trainId: 1,
    trainTrackId: 1,
    countryId: 1,
    anomalyTypeId: 1,
    signId: 1
 }] as Anomaly[];

  changeMode() {
    this.router.navigate(['/history']);
  }

  selectDay(day: string): void {
    this.selectedDay = day;
    this.onTrainDayChange(this.selectedTrain, this.selectedDay);
}
  onTrainClick(trainIndex: number) {
     this.selectedDay = null;
     this.selectedFilter = '';
     this.rangeDates = [new Date(), new Date()];

     if (this.selectedTrain === trainIndex) {
        this.selectedTrain = -1;
     } else {
        this.selectedTrain = trainIndex;
     }
     
     
  }

  getCurrentWeek(): string[] {
     const currentDate = new Date();
     // const startOfWeek = currentDate.getDate() - ((currentDate.getDay() + 6) % 7 -1);
     const startOfWeek = currentDate.getDate() - ((currentDate.getDay() + 6) % 7);
     const endOfWeek = startOfWeek + 6;

     const dates = [];
     for (let i = startOfWeek; i <= endOfWeek; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        dates.push(date.toISOString().split('T')[0]);
     }

     return dates;
  }

  getPreviousWeek(): string[] {
     const currentDate = new Date();
     const startOfPreviousWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - ((currentDate.getDay() + 6) % 7) - 7);
     const endOfPreviousWeek = new Date(startOfPreviousWeek.getFullYear(), startOfPreviousWeek.getMonth(), startOfPreviousWeek.getDate() + 6);

     const dates = [];
     for (let i = 0; i < 7; i++) {
        const date = new Date(startOfPreviousWeek.getFullYear(), startOfPreviousWeek.getMonth(), startOfPreviousWeek.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
     }

     return dates;
  }

  getCustomRange(): string[] {
     const start = this.rangeDates[0];
     const end = this.rangeDates[1];
     const dates = [];
 
     for (let i = start.getDate(); i <= end.getDate()+1; i++) {
         const date = new Date(start.getFullYear(), start.getMonth(), i);
         dates.push(date.toISOString().split('T')[0]);
     }
 
     return dates;
 }

  
  getAllAnomaliesByTrainAndDay(selectedTrainId: number, selectedDay: string): Anomaly[] {
    const trainAnomalies = this.anomalies.filter(anomaly => anomaly.trainId === selectedTrainId);

    if (!selectedDay) {
        return trainAnomalies.filter(anomaly => anomaly.isFixed);
    }

    const selectedDate = new Date(selectedDay);
    const filteredAnomaliesByDay = trainAnomalies.filter(anomaly => {
        const anomalyDate = new Date(anomaly.timestamp);
        return anomalyDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
    });

    // Return all fixed anomalies for the selected day
    return filteredAnomaliesByDay.filter(anomaly => anomaly.isFixed);
}



   signs = data.signs;
   trains = data.trains;
   tracks = data.tracks;
   anomalies = data.anomalies;
   countries = data.countries;
   anomalyTypes = data.anomalyTypes;
}
