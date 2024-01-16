import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Train } from '../Models/train';
import { Anomaly } from '../Models/anomaly';
import {TooltipPosition} from '@angular/material/tooltip';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-anomaly-item',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatButtonModule],
  templateUrl: './anomaly-item.component.html',
  styleUrls: ['./anomaly-item.component.css']
})




export class AnomalyItemComponent implements OnInit{

  trainAnomalies: Anomaly[] = [];

  ngOnInit(): void {
    this.trainAnomalies = this.anomalies.filter(a => a.trainId == this.train.id);
 }


  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  @Input() train : Train = {id: 0, name: ""};
  @Input() anomalies : Anomaly[] = [];
}
