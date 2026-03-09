import { AfterViewInit, Component, effect, inject, Input, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AmChart, AmChartsModule, AmChartsService } from '@amcharts/amcharts3-angular';
import { DayCategory } from '../../../../core/models/day-category';
import { NavigationService } from '../../../../core/services/navigation-service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-chart-sold',
  imports: [AmChartsModule],
  providers: [AmChartsService],
  templateUrl: './chart-sold.html',
  styleUrl: './chart-sold.css',
})
export class ChartSold implements AfterViewInit {
  @Input() code!: string;

  private chart!: AmChart;

  AmCharts = inject(AmChartsService);
  naviagationService = inject(NavigationService);
  private translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  dailyProductsList: Array<DayCategory> = new Array<DayCategory>();

  chartDataProvider = [
    {
      product: 'USA',
      qt: 2025,
      date: new Date(),
    },
    {
      product: 'China',
      qt: 1882,
      date: new Date(),
    },
  ];
  constructor() {
    // this.isVisible = false;
     this.naviagationService
        .getProductsDaily().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
          data=>{
            if (!data || !data.history) return;
            this.dailyProductsList = data.history;
            this.dailyProductsList.forEach(x => {
              if (x.date) x.date = new Date(x.date);
            });

      this.chartDataProvider = [];
      let lst = this.dailyProductsList.filter(
        (x) => x.date?.getFullYear() == 2025 && x.code == this.code,
      );

      for (let index = 0; index < lst.length; index++) {
        const element = lst[index];
        this.chartDataProvider.push({
          product: element.name ? element.name : '-',
          qt: element.qt ? element.qt : 0,
          date: element.date ? element.date : new Date(),
        });
      }

      this.buildChart();
    });

 

      
      
  }

  ngAfterViewInit(): void {
    this.buildChart();
  }

  buildChart() {
    this.chart = this.AmCharts?.makeChart(this.code, {
      type: 'serial',
      theme: 'none',
      dataProvider: this.chartDataProvider,
      language: this.translateService.getCurrentLang(),
      dataDateFormat: 'YYYY-MM-DD',
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
          valueField: 'qt',
        },
      ],
      chartCursor: {
        categoryBalloonEnabled: false,
        cursorAlpha: 0,
        zoomable: true,
      },
      categoryField: 'date',
      categoryAxis: {
        parseDates: true,
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
