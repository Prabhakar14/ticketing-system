import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZoomrxDashboardComponent } from './components/zoomrx-dashboard/zoomrx-dashboard.component';
import { ZoomrxCreateEditCardComponent } from './components/zoomrx-create-edit-card/zoomrx-create-edit-card.component';

const routes: Routes = [

  // Empty route.
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  { path: 'dashboard', component: ZoomrxDashboardComponent },

  { path: ':statusId/create', component: ZoomrxCreateEditCardComponent },

  { path: ':statusId/edit/:key', component: ZoomrxCreateEditCardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
