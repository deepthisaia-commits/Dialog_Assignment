import { Component } from '@angular/core';
import { WeightTrackerService } from './core/services/weight-tracker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public tracker: WeightTrackerService) {}

  onTargetChange(value: string) {
    const parsed = parseFloat(value);
    this.tracker.setTargetWeight(isNaN(parsed) ? null : parsed);
  }
}
