import { Component, inject } from '@angular/core';
import { NavigationService } from '../../../core/services/navigation-service';
import { Category } from '../../../core/models/category';
import { GraphSold } from '../home-dashboard/graph-sold/graph-sold';

@Component({
  selector: 'app-product-dashboard',
  imports: [GraphSold],
  templateUrl: './product-dashboard.html',
  styleUrl: './product-dashboard.css',
})
export class ProductDashboard {
  naviagationService = inject(NavigationService);
  currentProduct!: Category;

  constructor() {
    this.currentProduct = this.naviagationService.getCurrentProduct()();
  }
}
