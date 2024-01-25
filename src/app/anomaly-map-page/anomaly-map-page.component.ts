import { Component, OnInit } from '@angular/core';
import { Anomaly } from '../Models/anomaly';
import { CommonModule } from '@angular/common';
import { AnomalyItemComponent } from '../anomaly-item/anomaly-item.component';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';
import { data } from '../Models/mockdata';
import { RouterLink } from '@angular/router';
import { Service } from '../Service/service';
import { Sign } from '../Models/sign';
import { Train } from '../Models/train';
import { Traintrack } from '../Models/traintrack';
import { Country } from '../Models/country';
import { Anomalytype } from '../Models/anomalytype';

@Component({
  selector: 'app-anomaly-map-page',
  standalone: true,
  imports: [CommonModule, AnomalyItemComponent, FormsModule, MapComponent, RouterLink],
  templateUrl: './anomaly-map-page.component.html',
  styleUrl: './anomaly-map-page.component.css'
})
export class AnomalyMapPageComponent implements OnInit{
  signs: Sign[] = [];
  trains: Train[] = [];
  tracks: Traintrack[] = [];
  anomalies: Anomaly[] = [];
  countries: Country[] = [];
  anomalyTypes: Anomalytype[] = [];

  constructor(private router: Router, private service: Service) { }


  displayList = false;
  center = [50.85045,4.34878] as L.LatLngExpression;


  
  ngOnInit(): void {

    //API CODE DON'T REMOVE PLEASE
    // this.service.getSigns().subscribe(signs => {
    //   this.signs = signs;
    // });
    this.service.getTrains().subscribe(trains => {
      this.trains = trains;
    });
    this.service.getTrainTracks().subscribe(tracks => {
      this.tracks = tracks;
    });
    this.service.getAnomalies().subscribe(anomalies => {
      this.anomalies = anomalies.filter(anomaly => anomaly.isFixed === false);
      
    });
    this.service.getCountries().subscribe(countries => {
      this.countries = countries;
    });
    this.service.getAnomalyTypes().subscribe(anomalyTypes => {
      this.anomalyTypes = anomalyTypes;
    });

    // this.signs = data.signs;
    // this.trains = data.trains;
    // this.tracks = data.tracks;
    // this.anomalies = data.anomalies;
    // this.countries = data.countries;
    // this.anomalyTypes = data.anomalyTypes;
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
