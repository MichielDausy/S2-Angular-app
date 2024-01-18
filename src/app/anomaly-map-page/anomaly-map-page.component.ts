import { Component } from '@angular/core';
import { Anomaly } from '../Models/anomaly';
import { CommonModule } from '@angular/common';
import { AnomalyItemComponent } from '../anomaly-item/anomaly-item.component';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';
import { data } from '../Models/mockdata';

@Component({
  selector: 'app-anomaly-map-page',
  standalone: true,
  imports: [CommonModule, AnomalyItemComponent, FormsModule, MapComponent],
  templateUrl: './anomaly-map-page.component.html',
  styleUrl: './anomaly-map-page.component.css'
})
export class AnomalyMapPageComponent{

  constructor(private router: Router) { }


  displayList = false;

  changeMode() {
     this.router.navigate(['/anomaly']);
  }

  selectedCountry : string = "all";
  selectedTypes: string = "all";

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
  getTypesId(typeName: string): number | undefined {
    const country = this.anomalyTypes.find(c => c.name.toLowerCase() === typeName.toLowerCase());
    return country?.id;
 }


  getAnomaliesByCountry(countryName: string, typeName: string): Anomaly[] {
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

  // getAnomaliesByCountry(countryName: string): Anomaly[] {
  //   if (countryName === "all") {
  //     return this.anomalies;
  //   }
  //   else{
  //     const countryId = this.getCountryId(countryName);
  //     return this.anomalies.filter(a => a.countryId === countryId);
  //   }
  // }


    signs = data.signs;
    trains = data.trains;
    tracks = data.tracks;
    anomalies = data.anomalies;
    countries = data.countries;
    anomalyTypes = data.anomalyTypes;
}
