import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnomalyItemComponent } from '../anomaly-item/anomaly-item.component';
import { Anomaly } from '../Models/anomaly';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';
import { data } from '../Models/mockdata';
import { RouterLink } from '@angular/router';
import { Service } from '../Service/service';

@Component({
  selector: 'app-anomalypage',
  standalone: true,
  imports: [CommonModule, AnomalyItemComponent, FormsModule, MapComponent, RouterLink],
  templateUrl: './anomalypage.component.html',
  styleUrls: ['./anomalypage.component.css']
})


export class AnomalypageComponent{
  filteredAnomalies: Anomaly[] = [];

   selectedCountry : string = "all";
   selectedTypes: string = "all";

   constructor(private router: Router, private service: Service) { }

   displayList = false;

   changeMode() {
      this.router.navigate(['/anomaly/map']);
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



  getCountryId(countryName: string): number | undefined {
    const country = this.countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
    console.log(country);
    return country?.id;
 }
 getTypesId(typeName: string): number | undefined {
  const country = this.anomalyTypes.find(c => c.name.toLowerCase() === typeName.toLowerCase());
      console.log(country);
  return country?.id;
}

getAnomaliesByTrainAndCountry(trainId: number , countryName: string, typeName: string): Anomaly[] {
  if (countryName === "all" && typeName=== "all") {
    return this.anomalies;
  }
  else{
    const countryId = this.getCountryId(countryName);
    const typeId = this.getTypesId(typeName);
    return this.anomalies.filter(a => 
      (countryName === "all" || a.countryId === countryId) &&
      (typeName === "all" || a.anomalyTypeId === typeId)
    );
  }
}
   signs = data.signs;
   trains = data.trains;
   tracks = data.tracks;
   anomalies = data.anomalies;
   countries = data.countries;
   anomalyTypes = data.anomalyTypes;
}
