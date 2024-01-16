import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnomalyItemComponent } from '../anomaly-item/anomaly-item.component';
import { Anomaly } from '../Models/anomaly';
import { Train } from '../Models/train';

@Component({
  selector: 'app-anomalypage',
  standalone: true,
  imports: [CommonModule, AnomalyItemComponent],
  templateUrl: './anomalypage.component.html',
  styleUrls: ['./anomalypage.component.css']
})


export class AnomalypageComponent {


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
       longitude: "longitude1",
       latitude: "latitude1",
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
      longitude: "longitude2",
      latitude: "latitude2",
      photo: "photo2",
      isFixed: false,
      isFalse: false,
      trainId: 1,
      trainTrackId: 2,
      countryId: 2,
      anomalyTypeId: 2,
      signId: 2
   },
   {
      id: 1,
      timestamp: new Date(),
      longitude: "longitude1",
      latitude: "latitude1",
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
     longitude: "longitude2",
     latitude: "latitude2",
     photo: "photo2",
     isFixed: false,
     isFalse: false,
     trainId: 1,
     trainTrackId: 2,
     countryId: 2,
     anomalyTypeId: 2,
     signId: 2
  },
  {
   id: 1,
   timestamp: new Date(),
   longitude: "longitude1",
   latitude: "latitude1",
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
  longitude: "longitude2",
  latitude: "latitude2",
  photo: "photo2",
  isFixed: false,
  isFalse: false,
  trainId: 1,
  trainTrackId: 2,
  countryId: 2,
  anomalyTypeId: 2,
  signId: 2
},
{
   id: 1,
   timestamp: new Date(),
   longitude: "longitude1",
   latitude: "latitude1",
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
  longitude: "longitude2",
  latitude: "latitude2",
  photo: "photo2",
  isFixed: false,
  isFalse: false,
  trainId: 1,
  trainTrackId: 2,
  countryId: 2,
  anomalyTypeId: 2,
  signId: 2
},
{
   id: 1,
   timestamp: new Date(),
   longitude: "longitude1",
   latitude: "latitude1",
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
  longitude: "longitude2",
  latitude: "latitude2",
  photo: "photo2",
  isFixed: false,
  isFalse: false,
  trainId: 1,
  trainTrackId: 2,
  countryId: 2,
  anomalyTypeId: 2,
  signId: 2
},
{
   id: 1,
   timestamp: new Date(),
   longitude: "longitude1",
   latitude: "latitude1",
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
  longitude: "longitude2",
  latitude: "latitude2",
  photo: "photo2",
  isFixed: false,
  isFalse: false,
  trainId: 1,
  trainTrackId: 2,
  countryId: 2,
  anomalyTypeId: 2,
  signId: 2
},
{
   id: 1,
   timestamp: new Date(),
   longitude: "longitude1",
   latitude: "latitude1",
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
  longitude: "longitude2",
  latitude: "latitude2",
  photo: "photo2",
  isFixed: false,
  isFalse: false,
  trainId: 1,
  trainTrackId: 2,
  countryId: 2,
  anomalyTypeId: 2,
  signId: 2
},
{
   id: 1,
   timestamp: new Date(),
   longitude: "longitude1",
   latitude: "latitude1",
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
  longitude: "longitude2",
  latitude: "latitude2",
  photo: "photo2",
  isFixed: false,
  isFalse: false,
  trainId: 1,
  trainTrackId: 2,
  countryId: 2,
  anomalyTypeId: 2,
  signId: 2
},
{
   id: 1,
   timestamp: new Date(),
   longitude: "longitude1",
   latitude: "latitude1",
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
  longitude: "longitude2",
  latitude: "latitude2",
  photo: "photo2",
  isFixed: false,
  isFalse: false,
  trainId: 1,
  trainTrackId: 2,
  countryId: 2,
  anomalyTypeId: 2,
  signId: 2
},
   {
      id: 3,
      timestamp: new Date(),
      longitude: "longitude3",
      latitude: "latitude3",
      photo: "photo3",
      isFixed: false,
      isFalse: false,
      trainId: 3,
      trainTrackId: 3,
      countryId: 3,
      anomalyTypeId: 3,
      signId: 3
   },
   {
      id: 4,
      timestamp: new Date(),
      longitude: "longitude4",
      latitude: "latitude4",
      photo: "photo4",
      isFixed: false,
      isFalse: false,
      trainId: 4,
      trainTrackId: 4,
      countryId: 4,
      anomalyTypeId: 4,
      signId: 4
   },
   {
      id: 5,
      timestamp: new Date(),
      longitude: "longitude5",
      latitude: "latitude5",
      photo: "photo5",
      isFixed: false,
      isFalse: false,
      trainId: 5,
      trainTrackId: 5,
      countryId: 5,
      anomalyTypeId: 5,
      signId: 5
   }
  ] as Anomaly[];
}
