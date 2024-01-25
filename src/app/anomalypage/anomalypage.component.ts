import { Component, OnInit, OnChanges, SimpleChanges, Input, DoCheck } from '@angular/core';
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

@Component({
  selector: 'app-anomalypage',
  standalone: true,
  imports: [CommonModule, AnomalyItemComponent, FormsModule, MapComponent, RouterLink],
  templateUrl: './anomalypage.component.html',
  styleUrls: ['./anomalypage.component.css']
})


export class AnomalypageComponent {
  filteredAnomalies: Anomaly[] = [];

  searchName: string = '';
  selectedCountry: string = "all";
  selectedTypes: string = "all";

  constructor(private router: Router, private service: Service) { }

  displayList = false;

  changeMode() {
    this.router.navigate(['/anomaly/map']);
  }

  countryAnomalies = [{
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

  getFilteredTracks() {
    return this.tracks.filter(track => track.name.toLowerCase().includes(this.searchName.toLowerCase()));
  }
  

  getCountryId(countryName: string): number | undefined {
    const country = this.countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
    return country?.id;
  }

  getAnomalyTypesId(typeName: string): number | undefined {
    const type = this.anomalyTypes.find(c => c.name.toLowerCase() === typeName.toLowerCase());
    return type?.id;
  }

  getAnomaliesByTrainAndCountry(trainId: number, countryName: string, anoType: string): Anomaly[] {
    if (anoType === "all" && countryName === "all") {
      return this.anomalies.filter(a => a.trainId == trainId && !a.isFixed);
    }
    else if (anoType === "all" && countryName !== "all") {
      const countryId = this.getCountryId(countryName);
      return this.anomalies.filter(a => a.trainId == trainId && a.countryId == countryId && !a.isFixed);
    }
    else if (anoType !== "all" && countryName === "all") {
      const typeId = this.getAnomalyTypesId(anoType);
      return this.anomalies.filter(a => a.trainId == trainId && a.anomalyTypeId == typeId && !a.isFixed);
    } else {
      const countryId = this.getCountryId(countryName);
      const typeId = this.getAnomalyTypesId(anoType);
      return this.anomalies.filter(a => a.trainId == trainId && a.countryId == countryId && a.anomalyTypeId == typeId && !a.isFixed);
    }
  }

  

  signs = data.signs;
  trains = data.trains;
  tracks = data.tracks;
  anomalies = data.anomalies;
  countries = data.countries;
  anomalyTypes = data.anomalyTypes;

}
