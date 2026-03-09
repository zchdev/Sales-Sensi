import { DayCategory } from './day-category';

export class ReportCategory {
  code?: string;
  name?: string;
  price?: number;
  monthlyN?: number;
  values: Array<DayCategory> = new Array<DayCategory>(31);
}
