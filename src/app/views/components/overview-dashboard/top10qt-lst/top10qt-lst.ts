import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AllCategory } from '../../../../core/models/all-category';
import { TranslatePipe } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-top10qt-lst',
  imports: [TranslatePipe, CurrencyPipe],
  templateUrl: './top10qt-lst.html',
  styleUrl: './top10qt-lst.css',
})
export class Top10qtLST implements OnChanges {
  @Input() duration!: string;
  @Input() data!: AllCategory[];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.data = this.data.slice(0, 10);
    }
  }
}
