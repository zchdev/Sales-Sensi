import { Component, effect, inject, Input } from '@angular/core';
import { NavigationService } from '../../../../../core/services/navigation-service';
import { DayCategory } from '../../../../../core/models/day-category';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-day-cell',
  imports: [],
  templateUrl: './day-cell.html',
  styleUrl: './day-cell.css',
})
export class DayCell {
  @Input() day!: number;
  @Input() code!: string;
  @Input() month!: number;
  @Input() year!: number;

  naviagationService = inject(NavigationService);

  dailyProductsList: Array<DayCategory> = new Array<DayCategory>();

  cellData: DayCategory = new DayCategory();

  constructor() {
    this.naviagationService
        .getProductsDaily().subscribe(
          data=>
          {this.dailyProductsList = data;

      this.cellData.code = this.code;
      //this.cellData.date = new Date(this.year, this.month, this.day + 1);

      let elem = this.dailyProductsList.find(
        (x) =>
          x.code == this.code &&
          x.date?.getDate() == this.day + 1 &&
          x.date?.getMonth() == this.month &&
          x.date?.getFullYear() == this.year,
      );
      // this.cellData.date = elem ? elem.date : undefined;
      this.cellData.price = elem ? elem.price : 0;
      this.cellData.qt = elem ? elem.qt : 0;})
  }
}
