import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AllCategory } from '../../../../core/models/all-category';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { DayCategory } from '../../../../core/models/day-category';

@Component({
  selector: 'app-top10-rev-lst',
  imports: [CurrencyPipe, TranslatePipe, DatePipe],
  templateUrl: './top10-rev-lst.html',
  styleUrl: './top10-rev-lst.css',
})
export class Top10RevLST implements OnChanges {
  @Input() duration!: string;
  @Input() data!: DayCategory[];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.data = this.data.slice(0, 10).sort((a, b) => b.date!.getTime() - a.date!.getTime());
    }
  }
}
