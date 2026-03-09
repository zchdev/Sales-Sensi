import { SlicePipe } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { DayCategory } from '../../../../core/models/day-category';
import { AmChart, AmChartsModule, AmChartsService } from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-graph-per-day-qt',
  imports: [TranslatePipe, SlicePipe, AmChartsModule],
  providers: [AmChartsService],
  templateUrl: './graph-per-day-qt.html',
  styleUrl: './graph-per-day-qt.css',
})
export class GraphPerDayQt implements OnChanges {
  @Input() duration!: string;
  @Input() data!: DayCategory[];

  AmCharts = inject(AmChartsService);
  private chart!: AmChart;

  private translateService = inject(TranslateService);

  months: Array<{ lbl: string; n: number; color: string }> = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      let lst = this.data.filter((x) => x.date?.getFullYear() == 2025);
      for (let index = 0; index < this.months.length; index++) {
        this.months[index].n = lst
          .filter((x) => x.date?.getMonth() == index)
          .reduce(
            (accumulator, currentValue) =>
              accumulator + (currentValue.qt ? currentValue.qt * currentValue.price : 0),
            0,
          );
      }
      let max = Math.max(...this.months.map((x) => x.n));
      for (let index = 0; index < this.months.length; index++) {
        const element = this.months[index].n;
        if (element <= max * 0.25) {
          this.months[index].color = '#a5ccafff';
        }
        if (element > max * 0.25 && element <= max * 0.5) {
          this.months[index].color = '#53b097';
        }
        if (element > max * 0.5 && element <= max * 0.75) {
          this.months[index].color = '#16a381';
        }
        if (element > max * 0.75 && element <= max) {
          this.months[index].color = '#006255';
        }
      }
      this.buildChart();
    }
  }

  buildChart() {
    this.chart = this.AmCharts?.makeChart('qtweek', {
      type: 'serial',
      theme: 'none',
      dataProvider: this.months,
      language: this.translateService.getCurrentLang(),
      colors: ['#16a381'],
      valueAxes: [
        {
          gridColor: '#ffffff',
          gridAlpha: 0,
          dashLength: 0,
        },
      ],

      startDuration: 1,
      graphs: [
        {
          balloonText: '[[category]]: <b>[[value]]</b>',
          fillAlphas: 0.8,
          lineAlpha: 0.2,
          type: 'column',
          valueField: 'n',
        },
      ],
      chartCursor: {
        categoryBalloonEnabled: false,
        cursorAlpha: 0,
        zoomable: true,
      },
      categoryField: 'lbl',
      categoryAxis: {
        dashLength: 1,
        gridColor: '#ffffff',
        gridAlpha: 0,
      },
      export: {
        enabled: true,
      },
    });
  }

  constructor() {
    for (let index = 0; index < 12; index++) {
      this.months.push({
        lbl: moment().month(index).locale(this.translateService.getCurrentLang()).format('MMM'),
        n: 0,
        color: '#006255',
      });
    }
  }
}
