import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WeightEntry } from '../models/weight-entry.model';

@Injectable({ providedIn: 'root' })
export class WeightTrackerService {
  private entriesSubject = new BehaviorSubject<WeightEntry[]>([
    { id: 'e1', date: '2025-09-20', weight: 78.2, note: 'Start' },
    { id: 'e2', date: '2025-09-25', weight: 77.6, note: 'Gym' },
    { id: 'e3', date: '2025-09-30', weight: 76.9, note: 'Feeling good' }
  ]);
  entries$ = this.entriesSubject.asObservable();

  private targetWeightSubject = new BehaviorSubject<number | null>(75);
  targetWeight$ = this.targetWeightSubject.asObservable();

  addEntry(entry: WeightEntry) {
    const current = [...this.entriesSubject.value];
    const idx = current.findIndex(e => e.date === entry.date);
    if (idx >= 0) {
      entry.id = current[idx].id;
      current[idx] = entry;
    } else {
      current.push(entry);
    }
    current.sort((a,b) => a.date.localeCompare(b.date));
    this.entriesSubject.next(current);
  }

  removeEntry(id: string) {
    const updated = this.entriesSubject.value.filter(e => e.id !== id);
    this.entriesSubject.next(updated);
  }

  setTargetWeight(v: number | null) {
    this.targetWeightSubject.next(v);
  }

  get latestWeight(): number | null {
    const arr = this.entriesSubject.value;
    return arr.length ? arr[arr.length -1].weight : null;
  }

  get progress(): { diff: number, pct?: number } | null {
    const target = this.targetWeightSubject.value;
    const arr = this.entriesSubject.value;
    if (target == null || arr.length===0) return null;
    const latest = arr[arr.length-1].weight;
    const diff = Math.round((latest - target)*10)/10;
    const start = arr[0].weight;
    const need = Math.abs(start - target);
    if (need<=0) return { diff };
    const pct = Math.round((Math.abs(start - latest)/need)*100);
    return { diff, pct };
  }
}
