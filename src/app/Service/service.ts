import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anomaly } from '../Models/anomaly';

@Injectable({
  providedIn: 'root'
})

export class Service {

  private _url: string = "";

  constructor(private http: HttpClient) { }

  getAnomalies(): Observable<Anomaly[]> {
    return this.http.get<Anomaly[]>(this._url);
  }
}

