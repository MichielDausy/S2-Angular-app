import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnomalyItemComponent } from '../anomaly-item/anomaly-item.component';
import { Anomaly } from '../Models/anomaly';
import { Train } from '../Models/train';
import { Country } from '../Models/country';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-anomalypage',
  standalone: true,
  imports: [CommonModule, AnomalyItemComponent, FormsModule, RouterLink],
  templateUrl: './anomalypage.component.html',
  styleUrls: ['./anomalypage.component.css']
})


export class AnomalypageComponent {

   selectedCountry : string = "";
   countryAnomalies= [{
      id: 1,
      timestamp: new Date(),
      ...this.generateRandomCoordinate(),
      photo: "photo1",
      isFixed: false,
      isFalse: false,
      trainId: 1,
      trainTrackId: 1,
      countryId: 1,
      anomalyTypeId: 1,
      signId: 1
   }] as Anomaly[];

   generateRandomCoordinate() {
      const minLatitude = -90;
      const maxLatitude = 90;
      const minLongitude = -180;
      const maxLongitude = 180;
  
      const latitude = Math.random() * (maxLatitude - minLatitude) + minLatitude;
      const longitude = Math.random() * (maxLongitude - minLongitude) + minLongitude;
  
      return { latitude, longitude };
    }

    

   countries = [
      {
         id: 1,
         name: "Belgium"
      },
      {
         id: 2,
         name: "France"
      },
      {
         id: 3,
         name: "Germany"
      },
      {
         id: 4,
         name: "Netherlands"
      }
   ] as Country[];

  trains = [
      {
         id: 1,
         name: "Train 1"
      },
      {
         id: 2,
         name: "Train 2"
      },
      {
         id: 3,
         name: "Train 3"
      },
      {
         id: 4,
         name: "Train 4"
      }
   ] as Train[];

  anomalies = [
   {
      id: 1,
      timestamp: new Date(),
      ...this.generateRandomCoordinate(),
      photo: "photo1",
      isFixed: false,
      isFalse: false,
      trainId: 1,
      trainTrackId: 1,
      countryId: 1,
      anomalyTypeId: 1,
      signId: 1
  },
  {
     id: 2,
     timestamp: new Date(),
     ...this.generateRandomCoordinate(),
     photo: "photo2",
     isFixed: false,
     isFalse: false,
     trainId: 1,
     trainTrackId: 2,
     countryId: 1,
     anomalyTypeId: 2,
     signId: 2
  },
  {
     id: 3,
     timestamp: new Date(),
     ...this.generateRandomCoordinate(),
     photo: "photo3",
     isFixed: false,
     isFalse: false,
     trainId: 3,
     trainTrackId: 3,
     countryId: 1,
     anomalyTypeId: 3,
     signId: 3
  },
  {
     id: 4,
     timestamp: new Date(),
     ...this.generateRandomCoordinate(),
     photo: "photo4",
     isFixed: false,
     isFalse: false,
     trainId: 4,
     trainTrackId: 4,
     countryId: 2,
     anomalyTypeId: 4,
     signId: 4
  },
  {
     id: 5,
     timestamp: new Date(),
     ...this.generateRandomCoordinate(),
     photo: "photo5",
     isFixed: false,
     isFalse: false,
     trainId: 2,
     trainTrackId: 5,
     countryId: 5,
     anomalyTypeId: 5,
     signId: 5
  }
 ] as Anomaly[];
}
