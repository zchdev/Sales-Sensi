import { Component, effect, inject, Input, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DayCategory } from '../../../../core/models/day-category';
import { NavigationService } from '../../../../core/services/navigation-service';
import { TranslatePipe } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-header-indicators',
  imports: [TranslatePipe, CurrencyPipe],
  templateUrl: './header-indicators.html',
  styleUrl: './header-indicators.css',
})
export class HeaderIndicators {
  @Input() code!: string;

  naviagationService = inject(NavigationService);
  private destroyRef = inject(DestroyRef);

  indYear = { n: 0, price: 0, revenue: 0 };
  dailyProductsList: Array<DayCategory> = new Array<DayCategory>();

  constructor() {
    this.naviagationService.getProductsDaily().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
  data=>
{
  if (!data || !data.history) return;
  this.dailyProductsList = data.history.filter((x:DayCategory) => x.code == this.code && x.date?.getFullYear() == 2025);
      this.indYear.n = this.dailyProductsList.reduce(
        (accumulator, currentValue) => accumulator + (currentValue.qt ? currentValue.qt : 0),
        0,
      );
    
       const prodPrice = this.dailyProductsList.find((x) => x.price != null && x.price != undefined);
      this.indYear.price = prodPrice ? prodPrice.price : 0;
      this.indYear.revenue = this.indYear.n * this.indYear.price;
    }
)
    
  }
}
