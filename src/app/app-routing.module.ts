import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { AnomalypageComponent } from './anomalypage/anomalypage.component';
import { AnomalyDetailsComponent } from './anomaly-details/anomaly-details.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {path: 'anomaly', component: AnomalypageComponent},
  {path:'details/:id', component: AnomalyDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
