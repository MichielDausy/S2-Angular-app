import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Train } from '../Models/train';
import { Anomaly } from '../Models/anomaly';

@Component({
  selector: 'app-anomaly-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anomaly-item.component.html',
  styleUrls: ['./anomaly-item.component.css']
})




export class AnomalyItemComponent implements OnInit{

  trainAnomalies: Anomaly[] = [];

  ngOnInit(): void {
    this.trainAnomalies = this.anomalies.filter(a => a.trainId == this.train.id);
 }



  @Input() train : Train = {id: 0, name: ""};
  @Input() anomalies : Anomaly[] = [];
}
