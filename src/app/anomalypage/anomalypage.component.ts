import { Component, OnInit , OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnomalyItemComponent } from '../anomaly-item/anomaly-item.component';
import { Anomaly } from '../Models/anomaly';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';
import { data } from '../Models/mockdata';
import { RouterLink } from '@angular/router';
import { Service } from '../Service/service';
import { count } from 'rxjs';
import { Sign } from '../Models/sign';
import { Train } from '../Models/train';
import { Traintrack } from '../Models/traintrack';
import { Country } from '../Models/country';
import { Anomalytype } from '../Models/anomalytype';

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
   signs: Sign[] = [];
   trains: Train[] = [];
   tracks: Traintrack[] = [];
   anomalies: Anomaly[] = [];
   countries: Country[] = [];
   anomalyTypes: Anomalytype[] = [];
   searchName: string = '';


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
      signId: 1,
      count: 1
   }] as Anomaly[];

   sortedTracks: Traintrack[] = [];
   private sortTracksByAnomalyCount(): void {
    if (this.tracks.length > 0 && this.anomalies.length > 0) {
      this.sortedTracks = this.tracks.slice().sort((trackA, trackB) => {
        const countA = this.getAnomaliesForTrack(trackA.id).length;
        const countB = this.getAnomaliesForTrack(trackB.id).length;
        return countB - countA;
      });
    }
  }



//   getCountryId(countryName: string): number | undefined {
//     const country = this.countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
//     console.log(country);
//     return country?.id;
//  }
//  getTypesId(typeName: string): number | undefined {
//   const country = this.anomalyTypes.find(c => c.name.toLowerCase() === typeName.toLowerCase());
//       console.log(country);
//   return country?.id;
// }

// getAnomaliesByTrainAndCountry(trainId: number , countryName: string, typeName: string): Anomaly[] {
//   if (countryName === "all" && typeName=== "all") {
//     return this.anomalies;
//   }
//   else{
//     const countryId = this.getCountryId(countryName);
//     const typeId = this.getTypesId(typeName);
//     return this.anomalies.filter(a => 
//       (countryName === "all" || a.countryId === countryId) &&
//       (typeName === "all" || a.anomalyTypeId === typeId)
//     );
//   }
// }

ngOnInit(): void {

  //API CODE DON'T REMOVE PLEASE
  // this.service.getSigns().subscribe(signs => {
  //   this.signs = signs;
  // });
  // this.service.getTrains().subscribe(trains => {
  //   this.trains = trains;
  // });
  this.service.getTrainTracks().subscribe(tracks => {
    this.tracks = tracks;
    this.sortTracksByAnomalyCount();
  });
  this.service.getAnomalies().subscribe(anomalies => {
    this.anomalies = anomalies;
    this.sortTracksByAnomalyCount();
  });
  // this.service.getCountries().subscribe(countries => {
  //   this.countries = countries;
  // });
  // this.service.getAnomalyTypes().subscribe(anomalyTypes => {
  //   this.anomalyTypes = anomalyTypes;
  // });

  // this.signs = data.signs;
  // this.trains = data.trains;
  // this.tracks = data.tracks;
  // this.anomalies = data.anomalies;
  // this.countries = data.countries;
  // this.anomalyTypes = data.anomalyTypes;
}

ngOnChanges(changes: SimpleChanges): void {
   console.log('ngOnChanges called', changes);
   if (changes['selectedCountry']) {
     const countryId = this.getCountryId(this.selectedCountry);
     //console.log('selectedCountry changed', countryId);
     // Do something with countryId if needed
   }
 }
 
 getCountryId(countryName: string): number | undefined {
   //console.log('getCountryId called');
   const country = this.countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
   //console.log(country);
   return country?.id;
 }

 getAnomaliesForTrack(trackId: number): Anomaly[] {
   return this.anomalies.filter(anomaly => anomaly.trainTrackId === trackId);
 }
// ngOnChanges(changes: SimpleChanges): void {
//    console.log('ngOnChanges called', changes);
 
//    const countryChange = changes['selectedCountry'];
//    const typeChange = changes['selectedTypes'];
 
//    if (countryChange || typeChange) {
//      const countryId = countryChange ? this.getCountryId(this.selectedCountry) : undefined;
//      const typeId = typeChange ? this.getTypesId(this.selectedTypes) : undefined;
 
//      console.log('selectedCountry and/or selectedTypes changed', countryId, typeId);
//      // Do something with countryId and typeId if needed
//    }
//  }
 
//  getAnomaliesByTrainAndCountry(trainId: number, countryName: string, typeName: string): Anomaly[] {
//    console.log('getAnomaliesByTrainAndCountry called');
 
//    const countryId = countryName === 'all' ? undefined : this.getCountryId(countryName);
 
//    const filteredAnomalies = this.anomalies.filter(a =>
//      (countryName === 'all' || a.countryId === countryId)
//    );
 
//    if (typeName && typeName !== 'all') {
//      const typeId = this.getTypesId(typeName);
//      console.log("ID", typeId);
//      return filteredAnomalies.filter(a => a.anomalyTypeId === typeId);
//    }
 
//    return filteredAnomalies;
//  }
onSearchNameChange(value: string) {
    this.searchName = value;
    this.sortedTracks = this.tracks.filter(track => track.name.toLowerCase().includes(this.searchName.toLowerCase()));
  }
}
