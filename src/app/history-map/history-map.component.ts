import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnomalyItemComponent } from '../anomaly-item/anomaly-item.component';
import { Anomaly } from '../Models/anomaly';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { MapComponent } from '../map/map.component';
import { Traintrack } from '../Models/traintrack';
import { Service } from '../Service/service';
import { Train } from '../Models/train';
import { Country } from '../Models/country';
import { Anomalytype } from '../Models/anomalytype';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
   selector: 'app-history-map',
   standalone: true,
   imports: [CommonModule, AnomalyItemComponent, FormsModule, MapComponent, RouterLink, CalendarModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule],
   templateUrl: './history-map.component.html',
   styleUrl: './history-map.component.css'
})

export class HistoryMapComponent {
   constructor(private router: Router, private service: Service) { }

   // anomalies on the map
   filteredAnomalies: Anomaly[] | null = null;
   fixedAnomalies: Anomaly[] = [];

   selectedFilter: string = '';
   selectedTrain: number = -1;
   selectedDay: string ="";
   rangeDates: Date[] = [new Date(), new Date()];
   isFalseAnomaly: string = 'all';

   selectedCountry: string = "all";
   selectedTypes: string = "all";

   trains: Train[] = [];
   tracks: Traintrack[] = [];
   anomalies: Anomaly[] = [];
   countries: Country[] = [];
   anomalyTypes: Anomalytype[] = [];

   displayList = false;
   center = [50.85045, 4.34878] as L.LatLngExpression;

   ngOnInit(): void {
      this.getData();
   }

   getData(): void {
      this.service.getTrains().subscribe(trains => {
         this.trains = trains;
      });
      this.service.getTrainTracks().subscribe(tracks => {
         this.tracks = tracks;
      });
      this.service.getAnomalies().subscribe(anomalies => {
         this.anomalies = anomalies.filter(anomaly => anomaly.isFixed === true);
      });
      this.service.getCountries().subscribe(countries => {
         this.countries = countries;
      });
      this.service.getAnomalyTypes().subscribe(anomalyTypes => {
         this.anomalyTypes = anomalyTypes;
      });
   }

   getCountryId(countryName: string): number | undefined {
      const country = this.countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
      return country?.id;
   }
   getTypesId(typeName: string): number | undefined {
      const type = this.anomalyTypes.find(c => c.name.toLowerCase() === typeName.toLowerCase());
      return type?.id;
   }

   getAnomaliesByCountry(countryName: string, typeName: string): Anomaly[] {
      if (countryName === "all" && typeName === "all") {
         return this.anomalies;
      }
      else {
         const countryId = this.getCountryId(countryName);
         const typeId = this.getTypesId(typeName);
         return this.anomalies.filter(a =>
            (countryName === "all" || a.countryId === countryId) &&
            (typeName === "all" || a.anomalyTypeId === typeId)
         );
      }
   }

   resetFilters(): void {
      this.selectedCountry = "all";
      this.selectedTypes = "all";
      this.isFalseAnomaly = "all";
      this.getData();
   }

   changeMode() {
      this.router.navigate(['/history']);
   }

   getAllFixedAnomalies(): Anomaly[] {
      const fixedAnomalies = this.anomalies.filter(anomaly => anomaly.isFixed);
      return fixedAnomalies;
   }
   getAllFixedAnomaliesByTrain(trainId: number): Anomaly[] {
      return this.anomalies.filter(anomaly => anomaly.trainId === trainId && anomaly.isFixed);
   }


   onTrainClick(trainIndex: number) {
      this.selectedDay = "";
      this.selectedFilter = '';
      this.rangeDates = [new Date(), new Date()];

      if (this.selectedTrain === trainIndex) {
         this.selectedTrain = -1;
      } else {
         this.selectedTrain = trainIndex;
      }
   }

   selectDay(day: string): void {
      this.selectedDay = day;
   }

   getCurrentWeek(): string[] {
      const currentDate = new Date();
      const startOfWeek = currentDate.getDate() - ((currentDate.getDay() + 6) % 7 - 1);
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
      const startOfPreviousWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - ((currentDate.getDay() + 6) % 7) - 6);
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

      for (let i = start.getDate() + 1; i <= end.getDate() + 1; i++) {
         const date = new Date(start.getFullYear(), start.getMonth(), i);
         dates.push(date.toISOString().split('T')[0]);
      }
      return dates;
   }

   filterByIsFalse(anomalies: Anomaly[]): Anomaly[] {
      if (this.isFalseAnomaly === 'all' || this.isFalseAnomaly === 'right anomaly') {
         return anomalies;
      }
      if(this.isFalseAnomaly === 'fixed anomaly'){
         return anomalies.filter(anomaly => anomaly.isFalse === false);
      }
      if (this.isFalseAnomaly === 'false anomaly') {
         return anomalies.filter(anomaly => anomaly.isFalse === true);
      }
      return [];
   }


    getAnomaliesForTrack(trainId: number, date: string): Anomaly[] {
       const filterFn = (anomaly: Anomaly) => 
         (trainId === -1 || (anomaly.trainId === trainId && anomaly.isFixed === true));
   
       const countryFilter = (anomaly: Anomaly) => this.selectedCountry === "all" || anomaly.countryId === this.getCountryId(this.selectedCountry);
       const typeFilter = (anomaly: Anomaly) => this.selectedTypes === "all" || anomaly.anomalyTypeId === this.getTypesId(this.selectedTypes);
       const isFixedFilter = (anomaly: Anomaly) => this.isFalseAnomaly === "all" || (this.isFalseAnomaly === "fixed anomaly" && anomaly.isFixed === true) || (this.isFalseAnomaly === "false anomaly" && anomaly.isFalse === true);
   
       if (date !== "") {
         const filterDate = new Date(date);
         return this.anomalies.filter(anomaly =>
           filterFn(anomaly) && this.isSameDay(new Date(anomaly.timestamp), filterDate) && countryFilter(anomaly) && typeFilter(anomaly) && isFixedFilter(anomaly)
         );
       }
   
       return this.anomalies.filter(anomaly => 
         filterFn(anomaly) && countryFilter(anomaly) && typeFilter(anomaly) && (anomaly.isFixed === true || anomaly.isFalse === true)  && isFixedFilter(anomaly)
       );
     }
   
      private isSameDay(date1: Date, date2: Date): boolean {
         return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
         );
      }

}