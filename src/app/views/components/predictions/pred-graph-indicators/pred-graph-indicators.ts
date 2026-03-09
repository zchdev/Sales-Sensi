import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnCategory } from '../../../../core/models/an-category';

@Component({
  selector: 'app-pred-graph-indicators',
  imports: [CurrencyPipe, TranslatePipe],
  templateUrl: './pred-graph-indicators.html',
  styleUrl: './pred-graph-indicators.css',
})
export class PredGraphIndicators implements OnChanges {
  @Input() pred!: AnCategory;
  revenue = 0;
  qt = 0;
  price = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pred']) {
      this.revenue = this.pred.revenue!;
      this.qt = this.pred.qt!;
    }
  }
}
