import { Component, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { WeightEntry } from '../../core/models/weight-entry.model';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.css']
})
export class WeightChartComponent implements OnChanges, AfterViewInit {
  @Input() entries: WeightEntry[] | null = [];
  @Input() target: number | null = null;
  private chart: any | null = null;

  ngAfterViewInit(): void {
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.update();
    } else {
      this.render();
    }
  }

  private render() {
    const canvas = document.getElementById('weightChartCanvas') as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const labels = (this.entries ?? []).map(e => e.date);
    const data = (this.entries ?? []).map(e => e.weight);

    const datasets: any[] = [{
      label: 'Weight (kg)',
      data,
      borderColor: 'rgb(13,110,253)',
      backgroundColor: 'rgba(13,110,253,0.08)',
      tension: 0.25,
      pointRadius: 4,
      fill: false
    }];

    if (this.target != null && !isNaN(this.target)) {
      datasets.push({
        label: 'Target',
        data: labels.map(() => this.target),
        borderColor: 'rgb(25,135,84)',
        borderDash: [6, 6],
        pointRadius: 0,
        fill: false
      });
    }

    const cfg: any = {
      type: 'line',
      data: { labels, datasets },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: { legend: { display: true } },
        scales: {
          x: { grid: { color: '#f0f0f0' } },
          y: { grid: { color: '#f0f0f0' }, beginAtZero: false }
        }
      }
    };

    if (this.chart) this.chart.destroy();
    this.chart = new Chart(ctx, cfg);
  }

  private update() {
    if (!this.chart) { this.render(); return; }
    const labels = (this.entries ?? []).map(e => e.date);
    const data = (this.entries ?? []).map(e => e.weight);
    this.chart.data.labels = labels as any;
    if (this.chart.data.datasets && this.chart.data.datasets[0]) {
      this.chart.data.datasets[0].data = data as any;
    }
    if (this.target != null && !isNaN(this.target)) {
      if (this.chart.data.datasets && this.chart.data.datasets.length > 1) {
        this.chart.data.datasets[1].data = labels.map(() => this.target) as any;
      } else {
        this.chart.data.datasets.push({
          label: 'Target',
          data: labels.map(() => this.target),
          borderColor: 'rgb(25,135,84)',
          borderDash: [6, 6],
          pointRadius: 0,
          fill: false
        } as any);
      }
    } else {
      if (this.chart.data.datasets && this.chart.data.datasets.length > 1) {
        this.chart.data.datasets.splice(1, 1);
      }
    }
    this.chart.update();
  }
}
