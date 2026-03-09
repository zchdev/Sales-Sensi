import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DayCategory } from '../../../../core/models/day-category';

@Component({
  selector: 'app-rampup-rev',
  imports: [],
  templateUrl: './rampup-rev.html',
  styleUrl: './rampup-rev.css',
})
export class RampupRev {
  @Input() duration!: string;
  @Input() data!: DayCategory[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.data = this.data.reverse();
    }
  }
}
