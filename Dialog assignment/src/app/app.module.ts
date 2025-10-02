import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WeightFormComponent } from './features/weight-form/weight-form.component';
import { WeightListComponent } from './features/weight-list/weight-list.component';
import { WeightChartComponent } from './features/weight-chart/weight-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    WeightFormComponent,
    WeightListComponent,
    WeightChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
