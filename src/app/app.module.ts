import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ZoomrxAppMainComponent } from './components/zoomrx-app-main/zoomrx-app-main.component';
import { ZoomrxDashboardComponent } from './components/zoomrx-dashboard/zoomrx-dashboard.component';
import { ZoomrxCreateEditCardComponent } from './components/zoomrx-create-edit-card/zoomrx-create-edit-card.component';
import { ZoomrxAppHeaderComponent } from './components/zoomrx-app-header/zoomrx-app-header.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ZoomrxTicketCardComponent } from './components/zoomrx-ticket-card/zoomrx-ticket-card.component';

@NgModule({
  declarations: [
    ZoomrxAppMainComponent,
    ZoomrxDashboardComponent,
    ZoomrxCreateEditCardComponent,
    ZoomrxAppHeaderComponent,
    ZoomrxDashboardComponent,
    ZoomrxTicketCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [ZoomrxAppMainComponent]
})
export class AppModule { }
