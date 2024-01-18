import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnomalyItemComponent } from '../anomaly-item/anomaly-item.component';
import { Anomaly } from '../Models/anomaly';
import { Train } from '../Models/train';
import { Country } from '../Models/country';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';
import { data } from '../Models/mockdata';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-anomalypage',
  standalone: true,
  imports: [CommonModule, AnomalyItemComponent, FormsModule, RouterLink, MapComponent],
  templateUrl: './anomalypage.component.html',
  styleUrls: ['./anomalypage.component.css']
})


export class AnomalypageComponent{

   constructor(private router: Router) { }

   displayList = false;

   changeMode() {
      this.router.navigate(['/mapanomaly']);
   }

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

   signs = data.signs;
   trains = data.trains;
   tracks = data.tracks;
   anomalies = data.anomalies;
   countries = data.countries;
   anomalyTypes = data.anomalyTypes;
}
