export class AnCategory {
  year? = 0;
  qt?: number = 0;
  revenue?: number = 0;
  months?: Array<{
  label : number;
  value : number;
  name?: string;
}> = new Array<{
  label : number;
  value : number;
  name?: string;
}>();
  dayWeek?: Array<{
  label : number;
  value : number;
  name?: string;
}> = new Array<{
  label : number;
  value : number;
  name?: string;
}>();
  nextDays?: Array<{
  label : number;
  value : number;
  name?: string;
}> = new Array<{
  label : number;
  value : number;
  name?: string;
}>();
}
 

export interface CategoryItem {
  label: number;
  value: number;
  name?: string;
}

export interface AnCategory {
  year?: number;
  qt?: number;
  revenue?: number;
  months?: CategoryItem[];
  dayWeek?: CategoryItem[];
  nextDays?: CategoryItem[];
}