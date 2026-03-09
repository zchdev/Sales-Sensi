import { Component, effect, inject, OnInit } from '@angular/core';
import { NavigationService } from '../../../core/services/navigation-service';
import { DayCategory } from '../../../core/models/day-category';
import { AllCategory } from '../../../core/models/all-category';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { GraphPerDayQt } from './graph-per-month/graph-per-day-qt';
import { GraphPerDayRev } from './graph-per-day-rev/graph-per-day-rev';
import { Top10RevLST } from './top10-rev-lst/top10-rev-lst';
import { Top10qtLST } from './top10qt-lst/top10qt-lst';
import { TranslatePipe } from '@ngx-translate/core';
import { RampupRev } from './rampup-rev/rampup-rev';
import { AnCategory } from '../../../core/models/an-category';
import { ServerStorage } from '../../../ai/server-storage';
import { CategoryService } from '../../../ai/category-service';

@Component({
  selector: 'app-overview-dashboard',
  imports: [
    CurrencyPipe,
    DatePipe,
    GraphPerDayQt,
    GraphPerDayRev,
    Top10RevLST,
    Top10qtLST,
    TranslatePipe,
    RampupRev,
  ],
  templateUrl: './overview-dashboard.html',
  styleUrl: './overview-dashboard.css',
})
export class OverviewDashboard implements OnInit {
  naviagationService = inject(NavigationService);
 private catService = inject(CategoryService);
isVisible = false
  productsListQT: Array<AllCategory> = new Array<AllCategory>();
  productsListREV: Array<AllCategory> = new Array<AllCategory>();
  revenue = 0;
  qt = 0;
  price = 0;
  lastUpdate = new Date();
  dailyProductsList: Array<DayCategory> = new Array<DayCategory>();
  serverStorage = inject(ServerStorage);

  constructor() {

     
  
    effect(() => {
      

     
    });
  }
  ngOnInit(): void {
        this.isVisible = false;
this.naviagationService.getProductsDaily().subscribe(
  data=>
{this.dailyProductsList = data.history;
  this.dailyProductsList.forEach(x => {
    if (x.date) x.date = new Date(x.date);
  });
  console.log(('data'),data.history)
     try {
      // Using Option A for better data structure
      //  this.catService.saveFullHistory(this.dailyProductsList);
    
      console.log('Database synchronized successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
    }


      this.mapDailytoAnnually();
      this.lastUpdate = this.dailyProductsList[this.dailyProductsList.length - 1].date!;

      let lstDistinct = new Array<AllCategory>();
      let distinct = this.dailyProductsList.filter(
        (thing, i, arr) => arr.findIndex((t) => t.code === thing.code) === i,
      );
      for (let index = 0; index < distinct.length; index++) {
        const element = distinct[index];
        lstDistinct.push({
          code: element.code,
          name: element.name,
          price: element.price ? element.price : 0,
          qt: this.dailyProductsList
            .filter((x) => x.code == element.code && x.date?.getFullYear() == 2025)
            .reduce(
              (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
              0,
            ),
          revenue:
            this.dailyProductsList
              .filter((x) => x.code == element.code && x.date?.getFullYear() == 2025)
              .reduce(
                (accumulator, currentValue) =>
                  accumulator + (currentValue.qt ? currentValue.qt : 0),
                0,
              ) * element.price,
        });
      }
      this.productsListQT = lstDistinct.sort((a, b) => b.qt - a.qt);
      this.productsListREV = lstDistinct.sort((a, b) => b.revenue - a.revenue);
      this.revenue = this.productsListREV.reduce(
        (accumulator, currentValue) =>
          accumulator + (currentValue.revenue ? currentValue.revenue : 0),
        0,
      );
      this.qt = this.productsListQT.reduce(
        (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
        0,
      );
   this.isVisible = true;
}
)
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
      let anCat : AnCategory = {
        year: element,
        dayWeek: [],
        months: []
      };

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
      histroy.push(anCat);
    }
    
    

// try {
//       // Using Option A for better data structure
//        this.catService.saveFullHistory(histroy);
//       console.log('Database synchronized successfully!');
//     } catch (error) {
//       console.error('Upload failed:', error);
//     }
       
    console.log('histroy', histroy);
  }
}
