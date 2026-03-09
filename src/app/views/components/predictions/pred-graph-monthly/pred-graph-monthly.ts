import { AmChart, AmChartsModule, AmChartsService } from '@amcharts/amcharts3-angular';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AnCategory } from '../../../../core/models/an-category';

@Component({
  selector: 'app-pred-graph-monthly',
  imports: [TranslatePipe, AmChartsModule],
  providers: [AmChartsService],
  templateUrl: './pred-graph-monthly.html',
  styleUrl: './pred-graph-monthly.css',
})
export class PredGraphMonthly implements OnChanges {
  @Input() pred!: AnCategory;

  AmCharts = inject(AmChartsService);
  private chart!: AmChart;

  private translateService = inject(TranslateService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pred']) {
      this.buildChart();
    }
  }

  buildChart() {
    this.chart = this.AmCharts?.makeChart('graphmonth', {
      type: 'serial',
      theme: 'none',
      dataProvider: this.pred.months,
      language: this.translateService.getCurrentLang(),
      colors: ['#c92fec'],
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
          valueField: 'value',
        },
      ],
      chartCursor: {
        categoryBalloonEnabled: false,
        cursorAlpha: 0,
        zoomable: true,
      },
      categoryField: 'name',
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
