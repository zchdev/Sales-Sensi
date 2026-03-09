import { Component, effect, inject, Input, OnChanges, OnInit, SimpleChanges, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import moment from 'moment';
import { TranslatePipe, TranslateService, _ } from '@ngx-translate/core';
import { NavigationService } from '../../../../core/services/navigation-service';
import { DayCategory } from '../../../../core/models/day-category';
import { SlicePipe } from '@angular/common';
@Component({
  selector: 'app-graph-sold',
  imports: [TranslatePipe, SlicePipe],
  templateUrl: './graph-sold.html',
  styleUrl: './graph-sold.css',
})
export class GraphSold implements OnChanges,OnInit {
  @Input() code!: string;

  private translateService = inject(TranslateService);
  naviagationService = inject(NavigationService);
  private destroyRef = inject(DestroyRef);
  dailyProductsList: Array<DayCategory> = new Array<DayCategory>();

  soldbyMonthcolor: Array<{ month: number; n: number; color: string }> = new Array<{
    month: number;
    n: number;
    color: string;
  }>(11);

  days: Array<{ n: number; color: string }> = new Array<{ n: number; color: string }>(31);

  months = [
    moment().month(0).locale(this.translateService.getCurrentLang()).format('MMM'),
    moment().month(1).locale(this.translateService.getCurrentLang()).format('MMM'),
    moment().month(2).locale(this.translateService.getCurrentLang()).format('MMM'),
    moment().month(3).locale(this.translateService.getCurrentLang()).format('MMM'),
    moment().month(4).locale(this.translateService.getCurrentLang()).format('MMM'),
    moment().month(5).locale(this.translateService.getCurrentLang()).format('MMM'),
    moment().month(6).locale(this.translateService.getCurrentLang()).format('MMM'),
    moment().month(7).locale(this.translateService.getCurrentLang()).format('MMM'),
    moment().month(8).locale(this.translateService.getCurrentLang()).format('MMM'),
    moment().month(9).locale(this.translateService.getCurrentLang()).format('MMM'),
    moment().month(10).locale(this.translateService.getCurrentLang()).format('MMM'),
    moment().month(11).locale(this.translateService.getCurrentLang()).format('MMM'),
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['soldByMonth']) {
    }
  }

  constructor() {

   
          }
  ngOnInit(): void {
    this.naviagationService
        .getProductsDaily().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
          data=>
          {
            if (!data || !data.history) return;
 this.dailyProductsList = 
        data.history.filter((x:DayCategory) => x.code == this.code && x.date?.getFullYear() == 2025);

        this.dailyProductsList.forEach(x => {
          if (x.date) x.date = new Date(x.date);
        });
      this.mapGraphColors();
    });
  }
        


    

     
  

  mapGraphColors() {
    let soldByMonth = [
      this.dailyProductsList
        .filter((x) => x.date?.getMonth() == 0)
        .reduce(
          (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
          0,
        ),
      this.dailyProductsList
        .filter((x) => x.date?.getMonth() == 1)
        .reduce(
          (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
          0,
        ),
      this.dailyProductsList
        .filter((x) => x.date?.getMonth() == 2)
        .reduce(
          (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
          0,
        ),
      this.dailyProductsList
        .filter((x) => x.date?.getMonth() == 3)
        .reduce(
          (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
          0,
        ),
      this.dailyProductsList
        .filter((x) => x.date?.getMonth() == 4)
        .reduce(
          (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
          0,
        ),
      this.dailyProductsList
        .filter((x) => x.date?.getMonth() == 5)
        .reduce(
          (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
          0,
        ),
      this.dailyProductsList
        .filter((x) => x.date?.getMonth() == 6)
        .reduce(
          (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
          0,
        ),
      this.dailyProductsList
        .filter((x) => x.date?.getMonth() == 7)
        .reduce(
          (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
          0,
        ),
      this.dailyProductsList
        .filter((x) => x.date?.getMonth() == 8)
        .reduce(
          (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
          0,
        ),
      this.dailyProductsList
        .filter((x) => x.date?.getMonth() == 9)
        .reduce(
          (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
          0,
        ),
      this.dailyProductsList
        .filter((x) => x.date?.getMonth() == 10)
        .reduce(
          (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
          0,
        ),
      this.dailyProductsList
        .filter((x) => x.date?.getMonth() == 11)
        .reduce(
          (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
          0,
        ),
    ];

    let max = Math.max(...soldByMonth);

    for (let index = 0; index < soldByMonth.length; index++) {
      const element = soldByMonth[index];
      if (element <= max * 0.25) {
        this.soldbyMonthcolor[index] = { month: index, n: element, color: '#a5ccafff' };
      }
      if (element > max * 0.25 && element <= max * 0.5) {
        this.soldbyMonthcolor[index] = { month: index, n: element, color: '#53b097' };
      }
      if (element > max * 0.5 && element <= max * 0.75) {
        this.soldbyMonthcolor[index] = { month: index, n: element, color: '#16a381' };
      }
      if (element > max * 0.75 && element <= max) {
        this.soldbyMonthcolor[index] = { month: index, n: element, color: '#006255' };
      }
    }
  }
}
