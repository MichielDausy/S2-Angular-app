import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Anomaly } from '../Models/anomaly';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { Service } from '../Service/service';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-anomaly-details',
  standalone: true,
  imports: [CommonModule, RouterLink, CheckboxModule, FormsModule, MapComponent],
  templateUrl: './anomaly-details.component.html',
  styleUrls: ['./anomaly-details.component.css']
})
export class AnomalyDetailsComponent implements OnInit {

  constructor(private router: ActivatedRoute, private service: Service, private toastr: ToastrService, private location: Location) { }

  center = [0, 0] as L.LatLngExpression;
  anomaly: Anomaly = {
    id: 0,
    timestamp: new Date(),
    latitude: 0,
    longitude: 0,
    photo: "",
    isFixed: false,
    isFalse: false,
    trainId: 0,
    trainTrackId: 0,
    countryId: 0,
    anomalyTypeId: 0,
    signId: 0,
    count: 1
  };

  anomalyId: number = 0;
  isFixed: boolean = false;
  isFalse: boolean = false;
  showModal: boolean = false;

  ngOnInit(): void {
    this.anomalyId = this.router.snapshot.params['id'];
    //API CODE
    this.service.getAnomalyById(this.anomalyId).subscribe(anomaly => {
      this.anomaly = anomaly;
      this.center = [this.anomaly.latitude, this.anomaly.longitude] as L.LatLngExpression;
      this.isFalse = this.anomaly.isFalse;
      this.isFixed = this.anomaly.isFixed;
      console.log("anomaly loaded: " + (this.anomaly as Anomaly));
      console.log("fixed: " + this.isFixed);
      console.log("false: " + this.isFalse);
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(save: boolean, id: number): void {
    if (save) {
      this.submitChanges(this.anomalyId);
    }
    this.showModal = false;
    this.ngOnInit();
  }

  goBack(): void {
    this.location.back();
  }

  convertLatitudeToDegreesMinutesSeconds(latitude: number): string {
    const latDirection = latitude >= 0 ? 'N' : 'S';
    const latDegrees = Math.floor(Math.abs(latitude));
    const latMinutes = Math.floor((Math.abs(latitude) - latDegrees) * 60);
    const latSeconds = ((Math.abs(latitude) - latDegrees) * 60 - latMinutes) * 60;

    return `${latDegrees}°${latMinutes}'${latSeconds.toFixed(2)}"${latDirection}`;
  }

  convertLongitudeToDegreesMinutesSeconds(longitude: number): string {
    const lonDirection = longitude >= 0 ? 'E' : 'W';
    const lonDegrees = Math.floor(Math.abs(longitude));
    const lonMinutes = Math.floor((Math.abs(longitude) - lonDegrees) * 60);
    const lonSeconds = ((Math.abs(longitude) - lonDegrees) * 60 - lonMinutes) * 60;

    return `${lonDegrees}°${lonMinutes}'${lonSeconds.toFixed(2)}"${lonDirection}`;
  }

  onFalseChanged(event: any): void {
    if (event.target.checked) {
      this.isFixed = true;
    }
  }

  submitChanges(id: number): void {
    if (this.isFalse == true) {
      this.isFixed = true;
    }

    this.service.changeAnomalyStatusById(id, this.isFixed, this.isFalse).subscribe(anomaly => {
      this.anomaly = anomaly;
      this.toastr.success('Saved changes!', 'Success', { positionClass: 'toast-bottom-right' });
      this.ngOnInit();
    },
      error => {
        this.toastr.error('An error occured, changes have not been saved', 'Error', { positionClass: 'toast-bottom-right' });
        this.ngOnInit();
      });
    }
}
