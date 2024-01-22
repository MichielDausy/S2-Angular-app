import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anomaly } from '../Models/anomaly';
import { Traintrack } from '../Models/traintrack';
import { Train } from '../Models/train';
import { Anomalytype } from '../Models/anomalytype';
import { Country } from '../Models/country';
import { Sign } from '../Models/sign';

@Injectable({
  providedIn: 'root'
})

export class Service {

  private _url: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }
  

  getAnomalies(): Observable<Anomaly[]> {
    return this.http.get<Anomaly[]>(this._url+"anomalies");
  }

  getAnomalyById(id: number): Observable<Anomaly> {
    return this.http.get<Anomaly>(this._url+"anomalies/"+id);
  }

  getTrainTracks(): Observable<Traintrack[]> {
    return this.http.get<Traintrack[]>(this._url+"trainTracks");
  }

  getTrains(): Observable<Train[]> {
    return this.http.get<Train[]>(this._url+"trains");
  }

  getSigns(): Observable<Sign[]> {
    return this.http.get<Sign[]>(this._url+"signs");
  }

  getAnomalyTypes(): Observable<Anomalytype[]> {
    return this.http.get<Anomalytype[]>(this._url+"anomalyTypes");
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this._url+"countries");
  }

  markAnomalyAsFixedById(id: number): Observable<Anomaly> {
    return this.http.patch<Anomaly>(this._url+"anomalies/"+id, {isFixed: true});
  }

  markAnomalyAsFalseById(id: number): Observable<Anomaly> {
    return this.http.patch<Anomaly>(this._url+"anomalies/"+id, {isFalse: true});
  }

}

