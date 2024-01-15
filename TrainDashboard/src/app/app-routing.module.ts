import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { AnomalypageComponent } from './anomalypage/anomalypage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {path: 'anomaly', component: AnomalypageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
