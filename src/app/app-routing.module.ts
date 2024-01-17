import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AnomalypageComponent } from './anomalypage/anomalypage.component';
import { AnomalyDetailsComponent } from './anomaly-details/anomaly-details.component';
import { AnomalyMapDetailsPageComponent } from './anomaly-map-details-page/anomaly-map-details-page.component';
import { AnomalyMapPageComponent } from './anomaly-map-page/anomaly-map-page.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {path: 'anomaly', component: AnomalypageComponent},
  {path:'mapanomaly', component: AnomalyMapPageComponent},
  {path:'details/:id', component: AnomalyDetailsComponent},
  {path: 'mapdetails/:id', component: AnomalyMapDetailsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
