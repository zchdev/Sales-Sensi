import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  EnvironmentInjector,
  inject,
  OnInit,
  runInInjectionContext,
  ViewChild,
} from '@angular/core';
import { FilesService } from '../../../core/services/files-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { UploadView } from '../upload-view/upload-view';
import { Category } from '../../../core/models/category';
import { NavigationService } from '../../../core/services/navigation-service';
import { CommonModule } from '@angular/common';
import { GraphSold } from './graph-sold/graph-sold';
import { DayCategory } from '../../../core/models/day-category';
import { ErrorView } from '../../error-view/error-view';
import { ChartSold } from './chart-sold/chart-sold';
import { DayWeekSold } from './day-week-sold/day-week-sold';
import { HeaderIndicators } from './header-indicators/header-indicators';

@Component({
  selector: 'app-home-dashboard',
  imports: [CommonModule, GraphSold, ChartSold, DayWeekSold, HeaderIndicators, ErrorView],
  templateUrl: './home-dashboard.html',
  styleUrl: './home-dashboard.css',
})
export class HomeDashboard implements OnInit {
  isVisible = false;
  filesService = inject(FilesService);
  naviagationService = inject(NavigationService);

  //productsList: Array<Category> = this.naviagationService.getProductsAn()();
  productsList: Array<DayCategory> = new Array<DayCategory>();
  dailyProductsList: Array<DayCategory> = new Array<DayCategory>();

  //private environmentInjector = inject(EnvironmentInjector);

  ngOnInit(): void {
        this.isVisible = false;
this.naviagationService.getProductsDaily().subscribe(
  data=>{
  this.dailyProductsList = data.history;
  this.dailyProductsList.forEach(x => {
    if (x.date) x.date = new Date(x.date);
  });

    let lstDistinct = new Array<Category>();
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
        });
      }
      this.productsList = lstDistinct.sort((a, b) => b.qt - a.qt);

      this.isVisible = true;
 
})

}

  constructor() {
    // this.isVisible = false;
   
    // runInInjectionContext(this.environmentInjector, () => {
    //   effect(() => {
    //     this.productsList = this.naviagationService.getProductsAn()();
    //     console.log('User set to', this.naviagationService.productsListAnnually());
    //     this.isVisible = true;
    //   });
    // });
  }
}
