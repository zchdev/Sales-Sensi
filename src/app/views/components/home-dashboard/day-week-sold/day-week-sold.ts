import { Component, effect, inject, Input } from '@angular/core';
import { DayCategory } from '../../../../core/models/day-category';
import { NavigationService } from '../../../../core/services/navigation-service';
import moment from 'moment';
import { TranslatePipe, TranslateService, _ } from '@ngx-translate/core';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-day-week-sold',
  imports: [TranslatePipe, SlicePipe],
  templateUrl: './day-week-sold.html',
  styleUrl: './day-week-sold.css',
})
export class DayWeekSold {
  @Input() code!: string;

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
  naviagationService = inject(NavigationService);

  dailyProductsList: Array<DayCategory> = new Array<DayCategory>();
  constructor() {
    // this.isVisible = false;
    this.naviagationService
        .getProductsDaily().subscribe(
          data=>{
      this.dailyProductsList = data.history;

      this.dailyProductsList.forEach(x => {
        if (x.date) x.date = new Date(x.date);
      });

      let lst = this.dailyProductsList.filter(
        (x) => x.date?.getFullYear() == 2025 && x.code == this.code,
      );

      for (let index = 0; index < this.daysOfWeek.length; index++) {
        this.daysOfWeek[index].n = lst
          .filter((x) => x.date?.getDay() == index)
          .reduce(
            (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
            0,
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
    })

   
  }
}
