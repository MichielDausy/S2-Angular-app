import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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

  private _url: string = "http://localhost:8081/api/";
  
  private anomalySource = new BehaviorSubject<Anomaly | null>(null);
  currentAnomaly = this.anomalySource.asObservable();

  constructor(private http: HttpClient) { }

  changeAnomaly(anomaly: Anomaly | null) {
    this.anomalySource.next(anomaly);
  }
  
  getAnomalies(): Observable<Anomaly[]> {
    return this.http.get<Anomaly[]>(this._url+"anomalies/all");
  }

  getAnomalyById(id: number): Observable<Anomaly> {
    return this.http.get<Anomaly>(`${this._url}anomalies?id=${id}`);
  }

  getTrainTracks(): Observable<Traintrack[]> {
    return this.http.get<Traintrack[]>(this._url+"tracks/all");
  }

  getTrains(): Observable<Train[]> {
    return this.http.get<Train[]>(this._url+"trains/all");
  }

  getAnomalyTypes(): Observable<Anomalytype[]> {
    return this.http.get<Anomalytype[]>(this._url+"types/all");
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this._url+"countries/all");
  }

  changeAnomalyStatusById(id: number, isFixed: boolean, isFalse: boolean): Observable<Anomaly> {
    return this.http.put<Anomaly>(`${this._url}anomalies/mark`, { id, isFixed, isFalse });
  }

  getAnomaliesByTrack(trackId: number): Observable<Anomaly[]> {
    return this.http.get<Anomaly[]>(`${this._url}anomalies/byTrack?id=${trackId}`);
  }
}

