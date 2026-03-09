import { Component, effect, inject, signal, DestroyRef, computed, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PredGraphDaily } from './pred-graph-daily/pred-graph-daily';
import { PredGraphMonthly } from './pred-graph-monthly/pred-graph-monthly';
import { PredGraphIndicators } from './pred-graph-indicators/pred-graph-indicators';
import { PredTips } from './pred-tips/pred-tips';
import { NavigationService } from '../../../core/services/navigation-service';
import { DayCategory } from '../../../core/models/day-category';
import { AnCategory } from '../../../core/models/an-category';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { PredictionsService } from '../../../core/services/predictions';
import { GeminiService } from '../../../core/services/gemini-service';

@Component({
  selector: 'app-predictions',
  imports: [PredGraphDaily, PredGraphMonthly, PredGraphIndicators, PredTips],
  templateUrl: './predictions.html',
  styleUrl: './predictions.css',
})
export class Predictions {
  naviagationService = inject(NavigationService);
  private translateService = inject(TranslateService);
  private predictionsService = inject(PredictionsService);

  dailyProductsList: Array<DayCategory> = new Array<DayCategory>();
  histroy: Array<AnCategory> = new Array<AnCategory>();
  pred: AnCategory = new AnCategory();

  private geminiService = inject(GeminiService);
  private destroyRef = inject(DestroyRef);
  loading = signal(false);
  constructor() {
    effect(() => {
      const dailyData = this.naviagationService.productsListDaily();
      if (dailyData.length === 0) return;

      untracked(() => {
        this.dailyProductsList = [...dailyData];
        this.dailyProductsList.forEach((x) => {
          if (x.date && !(x.date instanceof Date)) x.date = new Date(x.date);
        });
        this.mapDailytoAnnually();
      });
    });
  }

  ngOnInit(): void {
    this.naviagationService
      .getProductsDaily()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  mapDailytoAnnually() {
    // get AN category
    let histroy: Array<AnCategory> = new Array<AnCategory>();
    let ans = this.dailyProductsList
      .filter(
        (thing, i, arr) =>
          arr.findIndex((t) => t.date?.getFullYear() === thing.date?.getFullYear()) === i,
      )
      .map((y) => y.date?.getFullYear());
    if (ans.find((x) => x == new Date().getFullYear())) {
      ans = ans.filter((y) => y != new Date().getFullYear());
    }
    for (let index = 0; index < ans.length; index++) {
      const element = ans[index]!;
      let anCat = new AnCategory();

      //year
      anCat.year = element;

      //qt
      anCat.qt = this.dailyProductsList
        .filter((x) => x.date?.getFullYear() == element)
        .reduce(
          (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
          0,
        );

      //revenue
      anCat.revenue = this.dailyProductsList
        .filter((x) => x.date?.getFullYear() == element)
        .reduce(
          (accumulator, currentValue) =>
            accumulator + (currentValue.qt ? currentValue.qt * currentValue.price : 0),
          0,
        );

      //dayWeek
      for (let j = 0; j < 7; j++) {
        anCat.dayWeek![j] = {
          name: moment().day(j).locale(this.translateService.getCurrentLang()).format('dd'),
          label: j,
          value: this.dailyProductsList
            .filter((x) => x.date?.getFullYear() == anCat.year)
            .filter((x) => x.date?.getDay() == j)
            .reduce(
              (accumulator, currentValue) =>
                accumulator + (currentValue.qt ? currentValue.qt : 0) * currentValue.price,
              0,
            ),
        };
      }

      //months

      for (let j = 0; j < 12; j++) {
        anCat.months![j] = {
          name: moment().month(j).locale(this.translateService.getCurrentLang()).format('MMM'),
          label: j,
          value: this.dailyProductsList
            .filter((x) => x.date?.getFullYear() == anCat.year)
            .filter((x) => x.date?.getMonth() == j)
            .reduce(
              (accumulator, currentValue) =>
                accumulator + (currentValue.qt ? currentValue.qt : 0) * currentValue.price,
              0,
            ),
        };
      }

      //next days
      for (let j = 0; j < 7; j++) {
        anCat.nextDays![j] = {
          name: moment()
            .add(0, 'days')
            .day(new Date().getDate() + (j - 1))
            .locale(this.translateService.getCurrentLang())
            .format('dd'),
          label: moment()
            .add(0, 'days')
            .day(new Date().getDate() + (j - 1))
            .day(),
          value: Math.round(
            this.dailyProductsList
              .filter((x) => x.date?.getFullYear() == anCat.year)
              .filter(
                (x) =>
                  x.date?.getDay() ==
                  new Date(
                    moment()
                      .add(0, 'days')
                      .day(new Date().getDate() + (j - 1))
                      .format()!,
                  ).getDay(),
              )
              .reduce(
                (accumulator, currentValue) =>
                  accumulator + (currentValue.qt ? currentValue.qt : 0) * currentValue.price,
                0,
              ) /
              this.dailyProductsList
                .filter((x) => x.date?.getFullYear() == anCat.year)
                .filter(
                  (x) =>
                    x.date?.getDay() ==
                    new Date(
                      moment()
                        .add(0, 'days')
                        .day(new Date().getDate() + (j - 1))
                        .format()!,
                    ).getDay(),
                ).length,
          ),
        };
      }
      histroy.push(anCat);
    }
    //if no predictions in the context get predictions
    // if (this.predictionsService.predictionsOverview == null) {
    //   const prompt =
    //     ' You are a forecasting API ' +
    //     'Input: JSON array of objects from 2022 to 2025.' +
    //     'Task: Generate forecast for year 2026.' +
    //     'Rules:' +
    //     '- Output ONLY VALID JSON ' +
    //     '- Output must be an array ' +
    //     '- Use same attributes as input ' +
    //     '- Year must be 2026 ' +
    //     '- No markdown ' +
    //     '- No explanation' +
    //     ' . Here is the JSON array of objects from 2022 to 2025' +
    //     JSON.stringify(histroy);

    //   this.loading.set(true);
    //   this.geminiService.askGemini(prompt).subscribe({
    //     next: (res) => {
    //       this.pred = JSON.parse(res.response)[0];
    //       this.predictionsService.predictionsOverview = JSON.parse(res.response)[0];
    //       this.loading.set(false);
    //     },
    //     error: (err) => {},
    //   });
    // }
    let res: AnCategory = new AnCategory();
    res.year = new Date().getFullYear();
    //get the average between history array revenue
    res.revenue = histroy.reduce((total, next) => total + next.revenue!, 0) / histroy.length;
    res.qt = histroy.reduce((total, next) => total + next.qt!, 0) / histroy.length;
    res.nextDays = histroy[0].nextDays;
    //moy day/week
    let dayweek = [];

    for (let j = 0; j < 7; j++) {
      let som = 0;
      for (let index = 0; index < histroy.length; index++) {
        const element = histroy[index];
        som += element.dayWeek![j].value;
      }
      let moyItem = histroy[0].dayWeek![j];
      moyItem.value = Math.round(som / histroy.length);
      dayweek.push(moyItem);
    }

    res.dayWeek = dayweek;

    //moy months
    let months = [];

    for (let j = 0; j < 12; j++) {
      let sommonth = 0;
      for (let index = 0; index < histroy.length; index++) {
        const element = histroy[index];
        sommonth += element.months![j].value;
      }
      let moyItem = histroy[0].months![j];
      moyItem.value = Math.round(sommonth / histroy.length);
      months.push(moyItem);
    }

    res.months = months;
    this.pred = res;
  }

  //next days
  // getNextDays() {
  //   let nextDays: Array<{ name: string; label: number; value: number }> = new Array<{
  //     name: string;
  //     label: number;
  //     value: number;
  //   }>();
  //   for (let j = 0; j < 7; j++) {
  //     nextDays[j] = {
  //       name: moment()
  //         .add(1, 'days')
  //         .day(j + 1)
  //         .locale(this.translateService.getCurrentLang())
  //         .format('dd'),
  //       label: j + 1,
  //       value: this.dailyProductsList
  //         // .filter((x) => x.date?.getFullYear() == new Date().getFullYear())
  //         .filter(
  //           (x) =>
  //             x.date?.getDay() ==
  //             new Date(
  //               moment()
  //                 .add(1, 'days')
  //                 .day(j + 1)
  //                 .format()!,
  //             ).getDay(),
  //         )
  //         .reduce(
  //           (accumulator, currentValue) =>
  //             accumulator + (currentValue.qt ? currentValue.qt : 0) * currentValue.price,
  //           0,
  //         ),
  //     };
  //   }
  //   console.log('nextDays', nextDays);
  //   return nextDays;
  // }
}
