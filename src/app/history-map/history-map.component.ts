import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnomalyItemComponent } from '../anomaly-item/anomaly-item.component';
import { Anomaly } from '../Models/anomaly';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { data } from '../Models/mockdata';
import { CalendarModule } from 'primeng/calendar';
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

   // anomalies on the map
   filteredAnomalies: Anomaly[] | null = null;
   fixedAnomalies: Anomaly[] = [];

   selectedFilter: string = '';
   selectedTrain: number = -1;
   selectedDay: string | null = null;
   rangeDates: Date[] = [new Date(), new Date()];

   displayList = false;
   center = [50.85045, 4.34878] as L.LatLngExpression;

   ngOnInit(): void {
      this.fixedAnomalies = this.getAllFixedAnomalies();
   }

   countryAnomalies = [{
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

   getAllFixedAnomalies(): Anomaly[] {
      const fixedAnomalies = this.anomalies.filter(anomaly => anomaly.isFixed);
      // console.log('Fixed Anomalies:', fixedAnomalies);
      return fixedAnomalies;
   }
   getAllFixedAnomaliesByTrain(trainId: number): Anomaly[] {
      return this.anomalies.filter(anomaly => anomaly.trainId === trainId && anomaly.isFixed);
   }


   onTrainClick(trainIndex: number) {
      this.selectedDay = null;
      this.selectedFilter = '';
      this.rangeDates = [new Date(), new Date()];

      if (this.selectedTrain === trainIndex) {
         this.selectedTrain = -1;
      } else {
         this.selectedTrain = trainIndex;
         this.onTrainDayChange(this.selectedTrain, '');
      }
   }

   onTrainDayChange(selectedTrainId: number, selectedDay: string): void {
      if (selectedTrainId !== -1) {
         // Als er een trein is geselecteerd, toon alle gefixte anomalieën voor die trein
         this.filteredAnomalies = this.getAllFixedAnomaliesByTrain(selectedTrainId);
         console.log('filteredAnomalies voor geselecteerde trein:', this.filteredAnomalies);
      }
      // Controleer of er een geselecteerde datum is
      if (selectedDay) { 
         const anomalies = this.getAllAnomaliesByTrainAndDay(selectedTrainId, selectedDay);

         // Controleer of er resultaten zijn voordat je filteredAnomalies toewijst
         if (anomalies.length > 0) {
            this.filteredAnomalies = anomalies;
            // console.log('filteredAnomalies:', this.filteredAnomalies);
         } else {
            // Geen resultaten, toon geen anomalies
            this.filteredAnomalies = null;
            // console.log('Geen anomalies gevonden.');
         }
      }

      // Als er geen overeenkomende anomalieën zijn, toon geen gefixte anomalieën
      if (!this.filteredAnomalies || this.filteredAnomalies.length === 0) {
         this.fixedAnomalies = [];
         // console.log('Geen overeenkomende anomalieën, toon geen gefixte anomalieën.');
      } else {
         this.fixedAnomalies = this.getAllFixedAnomalies();
      }
   }

   selectDay(day: string): void {
      this.selectedDay = day;
      this.onTrainDayChange(this.selectedTrain, this.selectedDay);
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

      for (let i = start.getDate(); i <= end.getDate() + 1; i++) {
         const date = new Date(start.getFullYear(), start.getMonth(), i);
         dates.push(date.toISOString().split('T')[0]);
      }

      return dates;
   }


   getAllAnomaliesByTrainAndDay(selectedTrainId: number, selectedDay: string): Anomaly[] {
      const trainAnomalies = this.anomalies.filter(anomaly => anomaly.trainId === selectedTrainId);
      console.log(trainAnomalies, "trainanomalies");

      if (!selectedDay) {
         console.log("Yes geen date");
         return trainAnomalies.length > 0 ? trainAnomalies : [];
      }

      const selectedDate = new Date(selectedDay);
      const filteredAnomaliesByDay = trainAnomalies.filter(anomaly => {
         const anomalyDate = new Date(anomaly.timestamp);
         return anomalyDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
      });

      const result = filteredAnomaliesByDay.filter(anomaly => anomaly.isFixed);
      console.log('Filtered anomalies:', result);
      return result;
   }

   signs = data.signs;
   trains = data.trains;
   tracks = data.tracks;
   anomalies = data.anomalies;
   countries = data.countries;
   anomalyTypes = data.anomalyTypes;
}
