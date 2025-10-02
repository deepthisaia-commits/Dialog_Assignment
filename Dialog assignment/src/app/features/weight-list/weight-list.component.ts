import { Component, Input } from '@angular/core';
import { WeightEntry } from '../../core/models/weight-entry.model';
import { WeightTrackerService } from '../../core/services/weight-tracker.service';

@Component({
  selector: 'app-weight-list',
  templateUrl: './weight-list.component.html',
  styleUrls: ['./weight-list.component.css']
})
export class WeightListComponent {
  @Input() entries: WeightEntry[] | null = [];

  constructor(private tracker: WeightTrackerService) {}

  remove(id: string) {
    if (confirm('Remove this entry?')) {
      this.tracker.removeEntry(id);
    }
  }
}
