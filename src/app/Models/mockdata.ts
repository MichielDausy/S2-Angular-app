import { Anomaly } from "./anomaly";
import { Anomalytype } from "./anomalytype";
import { Country } from "./country";
import { Sign } from "./sign";
import { Train } from "./train";


export const data = {
   signs: [
      {
         id: 1,
         name: "Sign 1",
         photo: "photo1"
      },
      {
         id: 2,
         name: "Sign 2",
         photo: "photo2"
      },
      {
         id: 3,
         name: "Sign 3",
         photo: "photo3"
      },
      {
         id: 4,
         name: "Sign 4",
         photo: "photo4"
      },
      {
         id: 5,
         name: "Sign 5",
         photo: "photo5"
      }
   ] as Sign[],

   tracks: [
      {
         id: 1,
         name: "B-87"
      },
      {
         id: 2,
         name: "A-33"
      },
      {
         id: 3,
         name: "A-54"
      },
      {
         id: 4,
         name: "B-10"
      }
   ] as Train[],

   countries: [
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
   ] as Country[],

   trains: [
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
   ] as Train[],

   anomalies: [
      {
         id: 1,
         timestamp: new Date(),
         longitude: 4.43851,
         latitude: 51.19210,
         photo: "photo1",
         isFixed: true,
         isFalse: true,
         trainId: 1,
         trainTrackId: 1,
         countryId: 1,
         anomalyTypeId: 2,
         signId: 1
      },
      {
         id: 2,
         timestamp: new Date().getDate() +2,
         longitude: 4.52126,
         latitude: 51.00397,
         photo: "photo2",
         isFixed: false,
         isFalse: true,
         trainId: 1,
         trainTrackId: 2,
         countryId: 1,
         anomalyTypeId: 2,
         signId: 2
      },
      {
         id: 3,
         timestamp: new Date(),
         longitude: 4.69302,
         latitude: 51.08272,
         photo: "photo3",
         isFixed: true,
         isFalse: true,
         trainId: 3,
         trainTrackId: 2,
         countryId: 1,
         anomalyTypeId: 2,
         signId: 3
      },
      {
         id: 4,
         timestamp: new Date(),
         longitude: 3.10367,
         latitude: 50.65272,
         photo: "photo4",
         isFixed: false,
         isFalse: false,
         trainId: 4,
         trainTrackId: 4,
         countryId: 2,
         anomalyTypeId: 1,
         signId: 4
      },
      {
         id: 5,
         timestamp: new Date(),
         longitude: 4.34070,
         latitude: 51.50889,
         photo: "photo5",
         isFixed: false,
         isFalse: false,
         trainId: 2,
         trainTrackId: 5,
         countryId: 4,
         anomalyTypeId: 1,
         signId: 5
      },
      {
         id: 6,
         timestamp: (() => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return yesterday;
         })(),
         longitude: 4.52126,
         latitude: 51.00397,
         photo: "photo1",
         isFixed: true,
         isFalse: false,
         trainId: 1,
         trainTrackId: 1,
         countryId: 1,
         anomalyTypeId: 1,
         signId: 1
      },
      {
         id: 7,
         timestamp: (() => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return yesterday;
         })(),
         longitude: 4.438553,
         latitude: 51.1928,
         photo: "photo1",
         isFixed: false,
         isFalse: false,
         trainId: 2,
         trainTrackId: 2,
         countryId: 1,
         anomalyTypeId: 1,
         signId: 1
      },
      {
         id: 8,
         timestamp: new Date(),
         longitude: 4.438553,
         latitude: 51.1928,
         photo: "photo1",
         isFixed: false,
         isFalse: false,
         trainId: 4,
         trainTrackId: 4,
         countryId: 1,
         anomalyTypeId: 1,
         signId: 1
      },
      {
         id: 9,
         timestamp: new Date(),
         longitude: 5.43851,
         latitude: 51.19210,
         photo: "photo1",
         isFixed: true,
         isFalse: false,
         trainId: 1,
         trainTrackId: 1,
         countryId: 1,
         anomalyTypeId: 1,
         signId: 1
      }
   ] as Anomaly[],

   anomalyTypes: [
      {
         id: 1,
         name: "Vegetation"
      },
      {
         id: 2,
         name: "Signs"
      }
   ] as Anomalytype[]
}