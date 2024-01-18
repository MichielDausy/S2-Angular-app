import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnomalyItemComponent } from '../anomaly-item/anomaly-item.component';
import { Anomaly } from '../Models/anomaly';
import { Train } from '../Models/train';
import { Country } from '../Models/country';
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

  selectedCountry : string = "all";
  
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

  getCountryId(countryName: string): number | undefined {
    const country = this.countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
    return country?.id;
 }
  
  getAnomaliesByTrainAndCountry(trainId: number, countryName: string): Anomaly[] {
    if (countryName === "all"){
       return this.anomalies.filter(a => a.trainId === trainId);
    }
    else{
       const countryId = this.getCountryId(countryName);
       return this.anomalies.filter(a => a.trainId === trainId && a.countryId === countryId);
    }
 }

   countries = data.countries;
   trains = data.trains;
   anomalies = data.anomalies;
   tracks = data.tracks;

   
}
