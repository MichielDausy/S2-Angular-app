import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnomalyItemComponent } from '../anomaly-item/anomaly-item.component';
import { Anomaly } from '../Models/anomaly';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { data } from '../Models/mockdata';

@Component({
   selector: 'app-history',
   standalone: true,
   imports: [CommonModule, AnomalyItemComponent, FormsModule, RouterLink],
   templateUrl: './history.component.html',
   styleUrl: './history.component.css'
})


export class HistoryComponent {
   selectedCountry: string = "all";
   selectedFilter: string = '';
   selectedTrain: number | null = null;
   selectedDay: string | null = null;


   selectDay(day: string) {
      this.selectedDay = day;
   }

   onTrainClick(trainIndex: number) {
      if (this.selectedTrain === trainIndex) {
         this.selectedTrain = null;
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

   getCountryId(countryName: string): number | undefined {
      const country = this.countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
      return country?.id;
   }

   getAnomaliesByTrainAndCountry(trainId: number, countryName: string): Anomaly[] {
      if (countryName === "all") {
         return this.anomalies.filter(a => a.trainId === trainId);
      }
      else {
         const countryId = this.getCountryId(countryName);
         return this.anomalies.filter(a => a.trainId === trainId && a.countryId === countryId);
      }
   }

   countries = data.countries;
   trains = data.trains;
   anomalies = data.anomalies;
   tracks = data.tracks;


}
