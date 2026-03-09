import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { DayCategory } from '../../../../core/models/day-category';
import { AmChart, AmChartsModule, AmChartsService } from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-graph-per-day-rev',
  imports: [TranslatePipe, SlicePipe, CurrencyPipe, AmChartsModule],
  providers: [AmChartsService],
  templateUrl: './graph-per-day-rev.html',
  styleUrl: './graph-per-day-rev.css',
})
export class GraphPerDayRev implements OnChanges {
  @Input() duration!: string;
  @Input() data!: DayCategory[];

  AmCharts = inject(AmChartsService);
  private chart!: AmChart;

  private translateService = inject(TranslateService);

  daysOfWeek = [
    {
      lbl: moment().day(0).locale(this.translateService.getCurrentLang()).format('dd'),
      n: 0,
      color: '#006255',
    },
    {
      lbl: moment().day(1).locale(this.translateService.getCurrentLang()).format('dd'),
      n: 0,
      color: '#006255',
    },
    {
      lbl: moment().day(2).locale(this.translateService.getCurrentLang()).format('dd'),
      n: 0,
      color: '#006255',
    },
    {
      lbl: moment().day(3).locale(this.translateService.getCurrentLang()).format('dd'),
      n: 0,
      color: '#006255',
    },
    {
      lbl: moment().day(4).locale(this.translateService.getCurrentLang()).format('dd'),
      n: 0,
      color: '#006255',
    },
    {
      lbl: moment().day(5).locale(this.translateService.getCurrentLang()).format('dd'),
      n: 0,
      color: '#006255',
    },
    {
      lbl: moment().day(6).locale(this.translateService.getCurrentLang()).format('dd'),
      n: 0,
      color: '#006255',
    },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      let lst = this.data.filter((x) => x.date?.getFullYear() == 2025);
      for (let index = 0; index < this.daysOfWeek.length; index++) {
        this.daysOfWeek[index].n = Math.round(
          lst
            .filter((x) => x.date?.getDay() == index)
            .reduce(
              (accumulator, currentValue) =>
                accumulator + (currentValue.qt ? currentValue.qt : 0) * currentValue.price,
              0,
            ),
        );
      }
      let max = Math.max(...this.daysOfWeek.map((x) => x.n));
      for (let index = 0; index < this.daysOfWeek.length; index++) {
        const element = this.daysOfWeek[index].n;
        if (element <= max * 0.25) {
          this.daysOfWeek[index].color = '#a5ccafff';
        }
        if (element > max * 0.25 && element <= max * 0.5) {
          this.daysOfWeek[index].color = '#53b097';
        }
        if (element > max * 0.5 && element <= max * 0.75) {
          this.daysOfWeek[index].color = '#16a381';
        }
        if (element > max * 0.75 && element <= max) {
          this.daysOfWeek[index].color = '#006255';
        }
      }
    }
    this.buildChart();
  }
  buildChart() {
    this.chart = this.AmCharts?.makeChart('revweek', {
      type: 'serial',
      theme: 'none',
      dataProvider: this.daysOfWeek,
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
          balloonText: '[[category]]: <b>[[value]] </b>',
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
}
