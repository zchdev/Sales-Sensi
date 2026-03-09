import { Component, effect, Inject, inject, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { UploadView } from '../../upload-view/upload-view';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router, RouterLink } from '@angular/router';
import { NgbTypeahead, NgbNavItem, NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import {
  Observable,
  startWith,
  map,
  Subject,
  OperatorFunction,
  debounceTime,
  distinctUntilChanged,
  filter,
  merge,
} from 'rxjs';
import { Category } from '../../../../core/models/category';
import { NavigationService } from '../../../../core/services/navigation-service';
import { DayCategory } from '../../../../core/models/day-category';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-nav-menu',
  imports: [FormsModule, NgbTypeahead, FormsModule, NgbHighlight, RouterLink],

  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.css',
})
export class NavMenu {
  private modalService = inject(NgbModal);
  naviagationService = inject(NavigationService);
  private router = inject(Router);
  currentURL = '';

  model: any;

  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  @ViewChild('instance2', { static: true }) instance2!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  productsList: Array<string> = new Array<string>();
  ALLproductsList: Array<DayCategory> = new Array<DayCategory>();

  isDataLoaded = false;
  displayUpload() {
    // this.modalService.open(UploadView, { fullscreen: true });
  }

  search: OperatorFunction<string, readonly DayCategory[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance2?.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        term === ''
          ? []
          : this.ALLproductsList.filter(
              (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1,
            ).slice(0, 10),
      ),
    );
  };

  formatter = (x: { name: string }) => x.name;

  constructor() {
    this.isDataLoaded = true;
    // effect(() => {
    //   this.productsList = this.naviagationService
    //     .getProductsAn()()
    //     .map((x) => x.name);
    //   this.ALLproductsList = this.naviagationService.getProductsAn()();
    //   setTimeout(() => {
    //     this.isDataLoaded = this.productsList.length > 0;
    //   }, 10);
    // });

    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      // if (event instanceof NavigationStart) {
      //   // Navigation starting
      //   console.log('Navigation starting:', event.url);
      // }
      if (event instanceof NavigationEnd) {
        // Navigation completed
        this.currentURL = event.url;
      }
    });
  }

  loadProduct() {
    this.naviagationService.setCurrentProduct(this.model);
    this.router.navigateByUrl('/app/product');
  }
}
