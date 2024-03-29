import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnomalyItemComponent } from '../anomaly-item/anomaly-item.component';
import { Anomaly } from '../Models/anomaly';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { Train } from '../Models/train';
import { ToastrService } from 'ngx-toastr';
import { Service } from '../Service/service';
import { Traintrack } from '../Models/traintrack';
import { Country } from '../Models/country';
import { Anomalytype } from '../Models/anomalytype';
import { PageLoaderComponent } from '../page-loader/page-loader.component';


@Component({
   selector: 'app-history',
   standalone: true,
   imports: [CommonModule, AnomalyItemComponent, FormsModule, RouterLink, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, PageLoaderComponent],
   templateUrl: './history.component.html',
   styleUrl: './history.component.css'
})

export class HistoryComponent implements OnInit {
   selectedCountry: string = "all";
   selectedFilter: string = '';
   selectedTrain: number = -1;
   selectedTypes: string = "all";
   selectedDay: string = "";
   rangeDates: Date[] = [new Date(), new Date()];
   showModal: boolean = false;
   modalAnomaly: Anomaly = {} as Anomaly;
   searchName: string = '';
   isFalseAnomaly: string = 'all';

   sortedTracks: Traintrack[] = [];

   trains: Train[] = [];
   tracks: Traintrack[] = [];
   anomalies: Anomaly[] = [];
   countries: Country[] = [];
   anomalyTypes: Anomalytype[] = [];

   noFilteredAnomalies: boolean = false;
   isLoading: boolean = false;

   constructor(private router: Router, private toastr: ToastrService, private service: Service) { }

   selectDay(day: string) {
      this.selectedDay = day;
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

   updateSort():void{
      this.sortTracksByAnomalyCount();
   }

   private sortTracksByAnomalyCount(): void {
      if (this.tracks.length > 0 && this.anomalies.length > 0) {
         this.sortedTracks = this.tracks
            .filter(track => track.name.toLowerCase().includes(this.searchName.toLowerCase()))
            .sort((trackA, trackB) => {
               const countA = this.getAnomaliesForTrack(trackA.id, this.selectedTrain, this.selectedDay || "").length;
               const countB = this.getAnomaliesForTrack(trackB.id, this.selectedTrain, this.selectedDay || "").length;

               if (countB !== countA) {
                  return countB - countA;
               } else {
                  return trackA.name.localeCompare(trackB.name);
               }
            });
      }
   }

   resetFilters() {
      this.selectedCountry = "all";
      this.selectedTypes = 'all';
      this.searchName = '';
      this.isFalseAnomaly = "all";
      this.getData();
   }

   getAnomaliesForTrack(trackId: number, trainId: number, date: string): Anomaly[] {
      const filterFn = (anomaly: Anomaly) =>
         anomaly.trainTrackId === trackId &&
         (trainId === -1 || (anomaly.trainId === trainId && anomaly.isFixed === true));

      const countryFilter = (anomaly: Anomaly) => this.selectedCountry === "all" || anomaly.countryId === this.getCountryId(this.selectedCountry);
      const typeFilter = (anomaly: Anomaly) => this.selectedTypes === "all" || anomaly.anomalyTypeId === this.getTypesId(this.selectedTypes);
      const isFixedFilter = (anomaly: Anomaly) => this.isFalseAnomaly === "all" || (this.isFalseAnomaly === "fixed anomaly" && anomaly.isFixed === true && anomaly.isFalse === false) || (this.isFalseAnomaly === "false anomaly" && anomaly.isFalse === true);

      if (date !== "") {
         const filterDate = new Date(date);
         return this.anomalies.filter(anomaly =>
            filterFn(anomaly) && this.isSameDay(new Date(anomaly.timestamp), filterDate) && countryFilter(anomaly) && typeFilter(anomaly) && isFixedFilter(anomaly)
         );
      }

      return this.anomalies.filter(anomaly =>
         filterFn(anomaly) && countryFilter(anomaly) && typeFilter(anomaly) && (anomaly.isFixed === true || anomaly.isFalse === true) && isFixedFilter(anomaly)
      );
   }


   private isSameDay(date1: Date, date2: Date): boolean {
      return (
         date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate()
      );
   }

   ngOnInit(): void {
      this.getData();
   }

   getData(): void {
      this.isLoading = true;
      this.service.getTrainTracks().subscribe(tracks => {
         this.tracks = tracks;
         this.sortTracksByAnomalyCount();
      });
      this.service.getAnomalies().subscribe(anomalies => {
         this.anomalies = anomalies;
         this.sortTracksByAnomalyCount();
      });
      this.service.getTrains().subscribe(trains => {
         this.trains = trains;
         this.sortTracksByAnomalyCount();
         this.isLoading = false;
      });
      this.service.getCountries().subscribe(countries => {
         this.countries = countries;
         this.sortTracksByAnomalyCount();
      });
      this.service.getAnomalyTypes().subscribe(anomalyTypes => {
         this.anomalyTypes = anomalyTypes;
         this.sortTracksByAnomalyCount();
      });
   }

   onSearchNameChange(value: string) {
      this.isLoading = true;
      this.searchName = value;
      this.sortTracksByAnomalyCount();
      // For search result -> 'No results found'
      this.noFilteredAnomalies = !this.sortedTracks.some(track => this.getAnomaliesForTrack(track.id, this.selectedTrain, this.selectedDay).length > 0);
      this.sortedTracks = this.sortedTracks.filter(track => this.getAnomaliesForTrack(track.id,this.selectedTrain, this.selectedDay).length > 0);
      this.isLoading = false;
   }

   changeMode() {
      this.router.navigate(['/history/map']);
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

      if (start && end) {
         const currentDate = new Date(start);

         while (currentDate <= end) {
            dates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
         }
      }
      return dates;
   }

   getCountryId(countryName: string): number | undefined {
      const country = this.countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
      return country?.id;
   }
   getTypesId(typeName: string): number | undefined {
      const country = this.anomalyTypes.find(c => c.name.toLowerCase() === typeName.toLowerCase());
      return country?.id;
   }

}
