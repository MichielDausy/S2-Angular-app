import { Component, OnInit } from '@angular/core';
import { Anomaly } from '../Models/anomaly';
import { CommonModule } from '@angular/common';
import { AnomalyItemComponent } from '../anomaly-item/anomaly-item.component';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Service } from '../Service/service';
import { Sign } from '../Models/sign';
import { Train } from '../Models/train';
import { Traintrack } from '../Models/traintrack';
import { Country } from '../Models/country';
import { Anomalytype } from '../Models/anomalytype';
import { PageLoaderComponent } from "../page-loader/page-loader.component";
import { forkJoin } from 'rxjs';
import { AppComponent } from "../new-map/new-map.component";

@Component({
    selector: 'app-anomaly-map-page',
    standalone: true,
    templateUrl: './anomaly-map-page.component.html',
    styleUrls: ['./anomaly-map-page.component.css'],
    imports: [CommonModule, AnomalyItemComponent, FormsModule, MapComponent, RouterLink, PageLoaderComponent, AppComponent]
})
export class AnomalyMapPageComponent implements OnInit{
  signs: Sign[] = [];
  trains: Train[] = [];
  tracks: Traintrack[] = [];
  anomalies: Anomaly[] = [];
  countries: Country[] = [];
  anomalyTypes: Anomalytype[] = [];
  isLoading: boolean = false;

  constructor(private router: Router, private service: Service) { }


  displayList = false;
  center = [50.85045,4.34878] as L.LatLngExpression;

  
  ngOnInit(): void {

    //API CODE DON'T REMOVE PLEASE
    // this.service.getSigns().subscribe(signs => {
    //   this.signs = signs;
    // });
    this.getData();
    // this.signs = data.signs;
    // this.trains = data.trains;
    // this.tracks = data.tracks;
    // this.anomalies = data.anomalies;
    // this.countries = data.countries;
    // this.anomalyTypes = data.anomalyTypes;
  }

  getData(): void {
    this.isLoading = true;
    // Combine multiple observables using forkJoin
  forkJoin([
    this.service.getTrains(),
    this.service.getTrainTracks(),
    this.service.getAnomalies(),
    this.service.getCountries(),
    this.service.getAnomalyTypes()
  ]).subscribe(
    ([trains, tracks, anomalies, countries, anomalyTypes]) => {
      // Assign data to respective properties
      this.trains = trains;
      this.tracks = tracks;
      this.anomalies = anomalies;
      this.countries = countries;
      this.anomalyTypes = anomalyTypes;

      // Set isLoading to false as all subscriptions are complete
      this.isLoading = false;
    },
    (error) => {
      console.error('Error loading data:', error);
      // Handle errors if needed
      this.isLoading = false; // Ensure isLoading is set to false even on error
    }
  );
  }
 
  changeMode() {
     this.router.navigate(['/anomaly/list']);
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
}
