import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AnCategory } from '../../../../core/models/an-category';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-pred-tips',
  imports: [TranslatePipe],
  templateUrl: './pred-tips.html',
  styleUrl: './pred-tips.css',
})
export class PredTips implements OnChanges {
  @Input() pred!: AnCategory;
  nextDays = new Array<{
  label : number;
  value : number;
  name?: string;
}>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pred']) {
      this.nextDays = this.pred.nextDays ?? [];
    }
  }
}
