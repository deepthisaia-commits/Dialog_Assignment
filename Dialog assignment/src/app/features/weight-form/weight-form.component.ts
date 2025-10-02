import { Component } from '@angular/core';
import { WeightTrackerService } from '../../core/services/weight-tracker.service';
import { WeightEntry } from '../../core/models/weight-entry.model';

@Component({
  selector: 'app-weight-form',
  templateUrl: './weight-form.component.html',
  styleUrls: ['./weight-form.component.css']
})
export class WeightFormComponent {
  weight: number | null = null;
  note = '';
  date: string = new Date().toISOString().split('T')[0];

  constructor(private tracker: WeightTrackerService) {}

  save() {
    if (this.weight == null || isNaN(this.weight)) {
      alert('Please enter a valid weight');
      return;
    }
    const entry: WeightEntry = {
      id: `${this.date}-${Date.now()}`,
      date: this.date,
      weight: Math.round(this.weight*10)/10,
      note: this.note ? this.note.trim() : undefined
    };
    this.tracker.addEntry(entry);
    this.weight = null;
    this.note = '';
  }
}
