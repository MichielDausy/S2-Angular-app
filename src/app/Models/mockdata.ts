import { Anomaly } from "./anomaly";
import { Anomalytype } from "./anomalytype";
import { Coordinate } from "./coordinate";
import { Country } from "./country";
import { Sign } from "./sign";
import { Train } from "./train";
import { Traintrack } from "./traintrack";


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
           name: "Train 1",
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
            isFixed: false,
            isFalse: false,
            trainId: 1,
            trainTrackId: 1,
            countryId: 1,
            anomalyTypeId: 1,
            signId: 1,
            count: 1
        },
        {
            id: 2,
            timestamp: new Date(),
            longitude:4.52126,
            latitude:51.00397,
            photo: "photo2",
            isFixed: false,
            isFalse: false,
            trainId: 1,
            trainTrackId: 2,
            countryId: 1,
            anomalyTypeId: 2,
            signId: 2,
            count: 2
        },
        {
            id: 3,
            timestamp: new Date(),
            longitude:4.69302,
            latitude:51.08272,
            photo: "photo3",
            isFixed: false,
            isFalse: false,
            trainId: 3,
            trainTrackId: 2,
            countryId: 1,
            anomalyTypeId: 2,
            signId: 3,
            count: 1
        },
        {
            id: 4,
            timestamp: new Date(),
            longitude:3.10367,
            latitude:50.65272,
            photo: "photo4",
            isFixed: false,
            isFalse: false,
            trainId: 4,
            trainTrackId: 4,
            countryId: 2,
            anomalyTypeId: 1,
            signId: 4,
            count: 1
        },
        {
            id: 5,
            timestamp: new Date(),
            longitude:4.34070,
            latitude:51.50889,
            photo: "photo5",
            isFixed: false,
            isFalse: false,
            trainId: 2,
            trainTrackId: 5,
            countryId: 4,
            anomalyTypeId: 1,
            signId: 5,
            count: 2
        },
        {
         id: 6,
         timestamp: new Date(),
         longitude:3.10367,
         latitude:50.65272,
         photo: "photo4",
         isFixed: false,
         isFalse: false,
         trainId: 4,
         trainTrackId: 4,
         countryId: 2,
         anomalyTypeId: 1,
         signId: 4,
         count: 7
     },
     {
         id: 7,
         timestamp: new Date(),
         longitude:4.34070,
         latitude:51.50889,
         photo: "photo5",
         isFixed: false,
         isFalse: false,
         trainId: 2,
         trainTrackId: 5,
         countryId: 4,
         anomalyTypeId: 1,
         signId: 5,
         count: 1
     },
     {
         id: 8,
         timestamp: new Date(),
         longitude:3.10367,
         latitude:50.65272,
         photo: "photo4",
         isFixed: false,
         isFalse: false,
         trainId: 4,
         trainTrackId: 4,
         countryId: 2,
         anomalyTypeId: 1,
         signId: 4,
         count: 1
     },
     {
         id: 9,
         timestamp: new Date(),
         longitude:4.34070,
         latitude:51.50889,
         photo: "photo5",
         isFixed: false,
         isFalse: false,
         trainId: 2,
         trainTrackId: 5,
         countryId: 4,
         anomalyTypeId: 1,
         signId: 5,
         count: 2
     },
     {
         id: 10,
         timestamp: new Date(),
         longitude:3.10367,
         latitude:50.65272,
         photo: "photo4",
         isFixed: false,
         isFalse: false,
         trainId: 4,
         trainTrackId: 4,
         countryId: 2,
         anomalyTypeId: 1,
         signId: 4,
         count: 1
     },
     {
         id: 11,
         timestamp: new Date(),
         longitude:4.34070,
         latitude:51.50889,
         photo: "photo5",
         isFixed: false,
         isFalse: false,
         trainId: 2,
         trainTrackId: 5,
         countryId: 4,
         anomalyTypeId: 1,
         signId: 5,
         count: 5
     },
     {
         id: 12,
         timestamp: new Date(),
         longitude:3.10367,
         latitude:50.65272,
         photo: "photo4",
         isFixed: false,
         isFalse: false,
         trainId: 4,
         trainTrackId: 4,
         countryId: 2,
         anomalyTypeId: 1,
         signId: 4,
         count: 1
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
      ] as Anomalytype[],

      coordinates:[
         {
            longitude: 4.43851,
            latitude: 51.19210
         }
      ] as Coordinate[],

      trainTracks: [
         {
            id: 1,
            name: "B-87",
            trackGeometry: [
               {
                  longitude: 4.43851,
                  latitude: 51.19210
               },
               {
                  longitude: 4.33851,
                  latitude: 51.29210
               }
            ] as Coordinate[]
         },
         {
            id: 2,
            name: "B-88",
            trackGeometry: [
               {
                  longitude: 4.52126,
                  latitude: 51.00397
               },
               {
                  longitude: 4.52126,
                  latitude: 51.10397
               }
            ] as Coordinate[]
         },
         {
            id: 3,
            name: "B-89",
            trackGeometry: [
               {
                  longitude: 4.69302,
                  latitude: 51.08272
               },
               {
                  longitude: 4.69302,
                  latitude: 51.18272
               }
            ] as Coordinate[]
         },
         {
            id: 4,
            name: "B-90",
            trackGeometry: [
               {
                  longitude: 3.10367,
                  latitude: 50.65272
               },
               {
                  longitude: 3.10367,
                  latitude: 50.75272
               }
            ] as Coordinate[]
         },
         {
            id: 5,
            name: "B-91",
            trackGeometry: [
               {
                  longitude: 4.34070,
                  latitude: 51.50889
               },
               {
                  longitude: 4.34070,
                  latitude: 51.60889
               }
            ] as Coordinate[]
         },
         {
            id: 6,
            name: "B-92",
            trackGeometry: [
               {
                  longitude: 4.34070,
                  latitude: 51.50889
               },
               {
                  longitude: 4.34070,
                  latitude: 51.60889
               }
            ] as Coordinate[]
         },
         {
            id: 7,
            name: "B-93",
            trackGeometry: [
               {
                  longitude: 4.34070,
                  latitude: 51.50889
               },
               {
                  longitude: 4.34070,
                  latitude: 51.60889
               }
            ] as Coordinate[]
         },
         {
            id: 8,
            name: "B-94",
            trackGeometry: [
               {
                  longitude: 4.34070,
                  latitude: 51.50889
               },
               {
                  longitude: 4.34070,
                  latitude: 51.60889
               }
            ] as Coordinate[]
         },
         {
            id: 9,
            name: "B-95",
            trackGeometry: [
               {
                  longitude: 4.34070,
                  latitude: 51.50889
               },
               {
                  longitude: 4.34070,
                  latitude: 51.60889
               }
            ] as Coordinate[]
         },
         {
            id: 10,
            name: "B-96",
            trackGeometry: [
               {
                  longitude: 4.34070,
                  latitude: 51.50889
               },
               {
                  longitude: 4.34070,
                  latitude: 51.60889
               }
            ] as Coordinate[]
         }
      ] as Traintrack[]
}