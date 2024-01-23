import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AnomalypageComponent } from './anomalypage/anomalypage.component';
import { AnomalyDetailsComponent } from './anomaly-details/anomaly-details.component';
import { AnomalyMapDetailsPageComponent } from './anomaly-map-details-page/anomaly-map-details-page.component';
import { AnomalyMapPageComponent } from './anomaly-map-page/anomaly-map-page.component';
import { HistoryComponent } from './history/history.component';
import { MenuComponent } from './menu/menu.component';
import { HistoryMapComponent } from './history-map/history-map.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {path: 'anomaly/list', component: AnomalypageComponent},
  {path:'anomaly/map', component: AnomalyMapPageComponent},
  {path: 'anomaly/map/details/:id', component: AnomalyMapDetailsPageComponent},
  {path:'anomaly/list/details/:id', component: AnomalyDetailsComponent},
  {path:'history', component: HistoryComponent},
  {path:'menu', component: MenuComponent},
  {path:'history/map', component: HistoryMapComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
