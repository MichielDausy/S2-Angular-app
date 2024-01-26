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
import { Sign } from '../Models/sign';
import { Country } from '../Models/country';
import { Anomalytype } from '../Models/anomalytype';


@Component({
   selector: 'app-history',
   standalone: true,
   imports: [CommonModule, AnomalyItemComponent, FormsModule, RouterLink, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule],
   templateUrl: './history.component.html',
   styleUrl: './history.component.css'
})

export class HistoryComponent implements OnInit {
   selectedCountry: string = "all";
   selectedFilter: string = '';
   selectedTrain: number = -1;
   selectedDay: string = "";
   rangeDates: Date[] = [new Date(), new Date()];
   showModal: boolean = false;
   modalAnomaly: Anomaly = {} as Anomaly;
  
   sortedTracks: Traintrack[] = [];

   signs: Sign[] = [];
   trains: Train[] = [];
   tracks: Traintrack[] = [];
   anomalies: Anomaly[] = [];
   countries: Country[] = [];
   anomalyTypes: Anomalytype[] = [];

   constructor(private router: Router, private toastr: ToastrService, private service: Service) { }

   ngOnInit(): void {

      this.service.getTrains().subscribe(trains => {
         this.trains = trains;
         // Stel de standaard geselecteerde trein in op -1 om aan te geven dat er geen specifieke trein is geselecteerd
         // this.selectedTrain = -1;
      });

      this.service.getTrainTracks().subscribe(tracks => {
         this.tracks = tracks;
         this.sortTracksByAnomalyCount();
      });

      this.service.getAnomalies().subscribe(anomalies => {
         // Filter alleen de gefixte anomalieën
         this.anomalies = anomalies.filter(anomaly => anomaly.isFixed === true);
         this.sortTracksByAnomalyCount();
      });

      this.service.getCountries().subscribe(countries => {
         this.countries = countries;
      });

      this.service.getAnomalyTypes().subscribe(anomalyTypes => {
         this.anomalyTypes = anomalyTypes;
      });

      this.sortTracksByAnomalyCount();
   }
   
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

   openModal(item: Anomaly) {
      this.showModal = true;
      this.modalAnomaly = { ...item };
   }

   closeModal(save: boolean) {
      if (save) {
         this.service.changeAnomalyStatusById(this.modalAnomaly.id, this.modalAnomaly.isFixed, this.modalAnomaly.isFalse).subscribe(() => {
            this.toastr.success('Saved changes!', 'Success');
            this.showModal = false;
            this.modalAnomaly = {} as Anomaly;
         }, error => {
            this.toastr.error('An error occured, changes have not been saved', 'Error');
         });
      } else {
         this.showModal = false;
         this.modalAnomaly = {} as Anomaly;
      }
   }

   private sortTracksByAnomalyCount(): void {
    if (this.tracks.length > 0 && this.anomalies.length > 0) {
      this.sortedTracks = this.tracks.slice().sort((trackA, trackB) => {
        const countA = this.getAnomaliesForTrack(trackA.id,this.selectedTrain, this.selectedDay || "").length;
        const countB = this.getAnomaliesForTrack(trackB.id, this.selectedTrain, this.selectedDay || "").length;
        return countB - countA;
      });
    }
  }


  getAnomaliesForTrack(trackId: number, trainId: number, date: string): Anomaly[] {
   const filterDate = date ? new Date(date) : this.selectedDay;

   if (trainId === -1) {
      return this.anomalies.filter(anomaly => anomaly.trainTrackId === trackId);
   } else {

      if (date !== "") {
         const filterDate = new Date(date);
         return this.anomalies.filter(anomaly => {
            const anomalyDate = new Date(anomaly.timestamp);
            return (
               anomaly.trainTrackId === trackId &&
               anomaly.trainId == trainId &&
               this.isSameDay(anomalyDate, filterDate)
            );
         });
      } else {
         return this.anomalies.filter(anomaly =>
            anomaly.trainTrackId === trackId &&
            anomaly.trainId === trainId
         );
      }
   }
}

   private isSameDay(date1: Date, date2: Date): boolean {
      return (
         date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate()
      );
   }

  ngOnInit(): void {
    this.service.getTrainTracks().subscribe(tracks => {
       this.tracks = tracks;
       this.sortTracksByAnomalyCount();
     });
     this.service.getAnomalies().subscribe(anomalies => {
       this.anomalies = anomalies;
       this.sortTracksByAnomalyCount();
     });
     this.service.getTrains().subscribe(trains => this.trains = trains);
     this.service.getCountries().subscribe(countries => this.countries = countries);
  }
  
   changeMode() {
      this.router.navigate(['/history/map']);
   }

   getCurrentWeek(): string[] {
      const currentDate = new Date();
      const startOfWeek = currentDate.getDate() - ((currentDate.getDay() + 6) % 7 - 1);
      //const startOfWeek = currentDate.getDate() - ((currentDate.getDay() + 6) % 7);
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

   getTrainById(trainId: number): Train {
      const train = this.trains.find(t => t.id === trainId);
      return train as Train;
   }

   getAllAnomaliesByCountryAndDay(selectedTrainId: number, selectedCountry: string, selectedDay: string): Anomaly[] {
      const filteredAnomalies: Anomaly[] = [];

      const trainAnomalies = this.anomalies.filter(anomaly => anomaly.trainId === selectedTrainId);

      const countryId = selectedCountry === 'all' ? undefined : this.getCountryId(selectedCountry);
      const countryAnomalies = trainAnomalies.filter(anomaly => {
         return countryId === undefined || anomaly.countryId === countryId;
      });

      if (selectedDay) {
         const selectedDate = new Date(selectedDay);
         const filteredAnomaliesByDay = countryAnomalies.filter(anomaly => {
            const anomalyDate = new Date(anomaly.timestamp);
            return anomalyDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
         });
         filteredAnomalies.push(...filteredAnomaliesByDay);
      } else {
         filteredAnomalies.push(...countryAnomalies);
      }

      const fixedAnomalies = filteredAnomalies.filter(anomaly => anomaly.isFixed);

      console.log("train: " + selectedTrainId + ", country: " + selectedCountry + ", day: " + selectedDay);
      return fixedAnomalies;

   }
}
