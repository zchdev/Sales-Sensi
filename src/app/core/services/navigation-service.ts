import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Category } from '../models/category';
import { DayCategory } from '../models/day-category';
import { ReportCategory } from '../models/report-category';
import { CategoryService } from '../../ai/category-service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
catService = inject(CategoryService)

  dailyProducts = new Array<DayCategory>();
  //current product to display
  currentProduct: Category = new Category();

  private currentProduct$ = signal<Category>(new Category());

  getCurrentProduct(): WritableSignal<Category> {
    return this.currentProduct$;
  }

  setCurrentProduct(pr: Category) {
    this.currentProduct$.update((p) => pr);
    this.currentProduct = pr;
  }

  //---- Annual data
  private productsListAnnually = signal<Array<DayCategory>>(new Array<DayCategory>());

  getProductsAn(): WritableSignal<Array<DayCategory>> {
    return this.productsListAnnually;
  }

  setProductsAn(productsList: Array<DayCategory>) {
    this.productsListAnnually.update((p) => productsList);
  }

  //---- Daily data
  private productsListDaily = signal<Array<DayCategory>>(new Array<DayCategory>());

  getProductsDaily(): Observable<any> {
   
    return  this.catService.getAllHistory().pipe(
      map((data) => {
        this.setProductsDaily(data.history);
        return data;
      })
    )
  }

  setProductsDaily(productsList: Array<DayCategory>) {
    this.dailyProducts = productsList;
    this.productsListDaily.set(productsList);
  }

  //combined report
  mapProducts(): Array<ReportCategory> {
    let rc: Array<ReportCategory> = new Array<ReportCategory>();

    // let monthly = this.getProductsAn()();
    // let daily = this.getProductsDaily()();

    // for (let index = 0; index < monthly.length; index++) {
    //   const element = monthly[index];
    //   rc.push({code:element.code; name:element.name; price:element.price; })
    // }
    return rc;
  }
}
