import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnomalyItemComponent } from '../anomaly-item/anomaly-item.component';
import { Anomaly } from '../Models/anomaly';
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

@Component({
  selector: 'app-anomalypage',
  standalone: true,
  templateUrl: './anomalypage.component.html',
  styleUrls: ['./anomalypage.component.css'],
  imports: [CommonModule, AnomalyItemComponent, FormsModule, MapComponent, RouterLink, PageLoaderComponent]
})


export class AnomalypageComponent {
  filteredAnomalies: Anomaly[] = [];

  searchName: string = '';
  selectedCountry: string = "all";
  selectedTypes: string = "all";
  displayList = false;
  noFilteredAnomalies: boolean = false;
  isLoading: boolean = false;

  signs: Sign[] = [];
  trains: Train[] = [];
  tracks: Traintrack[] = [];
  anomalies: Anomaly[] = [];
  countries: Country[] = [];
  anomalyTypes: Anomalytype[] = [];
  sortedTracks: Traintrack[] = [];

  constructor(private router: Router, private service: Service) { }

  ngOnInit(): void {
    this.service.getTrainTracks().subscribe(tracks => {
      this.tracks = tracks;
      this.sortTracksByAnomalyCount();
    });
    this.service.getAnomalies().subscribe(anomalies => {
      this.anomalies = anomalies.filter(anomaly => anomaly.isFixed === false);
      this.sortTracksByAnomalyCount();
    });
    this.service.getCountries().subscribe(countries => {
      this.countries = countries;
   });

   this.service.getAnomalyTypes().subscribe(anomalyTypes => {
      this.anomalyTypes = anomalyTypes;
   });

  }

  changeMode() {
    this.router.navigate(['/anomaly/map']);
  }

  getData(): void {
    this.isLoading = true;
    this.service.getTrainTracks().subscribe(tracks => {
      this.tracks = tracks;
    });
    this.service.getAnomalies().subscribe(anomalies => {
      this.anomalies = anomalies;
      this.sortTracksByAnomalyCount();
      this.isLoading = false;
    });
  }

  private sortTracksByAnomalyCount(sortedTracks?: Traintrack[]): void {
    if (sortedTracks === undefined) {
      if (this.tracks.length > 0 && this.anomalies.length > 0) {
        this.sortedTracks = this.tracks.slice().sort((trackA, trackB) => {
          const countA = this.getAnomaliesForTrack(trackA.id).length;
          const countB = this.getAnomaliesForTrack(trackB.id).length;
          return countB - countA;
        });
      }
    } else if (sortedTracks !== undefined) {
      this.sortedTracks = sortedTracks.slice().sort((trackA, trackB) => {
        const countA = this.getAnomaliesForTrack(trackA.id).length;
        const countB = this.getAnomaliesForTrack(trackB.id).length;
        return countB - countA;
      });
    }
  }


  getCountryId(countryName: string): number | undefined {
    const country = this.countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
    console.log("Country of getcountryid", country);
    return country?.id;
  }
  getTypesId(typeName: string): number | undefined {
    const country = this.anomalyTypes.find(c => c.name.toLowerCase() === typeName.toLowerCase());
    console.log("Types of getTypesid", country);

    return country?.id;
  }

  
  getAnomaliesForTrack(trackId: number): Anomaly[] {
    if(this.selectedCountry !== "all") {
      if(this.selectedTypes !== "all") {
        return this.anomalies.filter(anomaly => anomaly.trainTrackId === trackId && anomaly.countryId === this.getCountryId(this.selectedCountry) && anomaly.anomalyTypeId === this.getTypesId(this.selectedTypes));
      }
      else{
        return this.anomalies.filter(anomaly => anomaly.trainTrackId === trackId && anomaly.countryId === this.getCountryId(this.selectedCountry));
      }
    }
    else{
      if(this.selectedTypes !== "all") {
        return this.anomalies.filter(anomaly => anomaly.trainTrackId === trackId && anomaly.anomalyTypeId === this.getTypesId(this.selectedTypes));
      }
      else{
        return this.anomalies.filter(anomaly => anomaly.trainTrackId === trackId);
      }
    }
  }

  onSearchNameChange(value: string) {
    this.isLoading = true;
    this.searchName = value;
    this.sortTracksByAnomalyCount(this.tracks.filter(track => track.name.toLowerCase().includes(this.searchName.toLowerCase())));
    // For search result -> 'No results found'
    this.noFilteredAnomalies = !this.sortedTracks.some(track => this.getAnomaliesForTrack(track.id).length > 0);
    this.isLoading = false;
  }
}
