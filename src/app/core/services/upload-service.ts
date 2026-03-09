import { inject, Injectable, signal } from '@angular/core';
import * as Papa from 'papaparse';
import { Category } from '../models/category';
import { DayCategory } from '../models/day-category';
import { NavigationService } from './navigation-service';
@Injectable({
  providedIn: 'root',
})
export class UploadService {
  navigationService = inject(NavigationService);
  dataListe: any[] = [];
  headers: string[] = [];

  loadFile(file?: FileList | null) {
    if (file) {
      Papa.parse(file[0], {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (result: any) => {
          // console.log(result);
        },
      });
    }
  }

  loadDailyFile(file?: FileList | null): Array<DayCategory> {
    let catArray = new Array<DayCategory>();
    if (file) {
      let that = this;

      Papa.parse(file[0], {
        header: false,
        dynamicTyping: false,
        download: true,
        worker: true,
        step: function (row) {
          let dataCSV = row.data as any;
          let dataFormat = new DayCategory();

          if (row.data) {
            try {
              dataFormat.code = dataCSV[0].trim();
              dataFormat.name = dataCSV[1];
              dataFormat.date = that.mapDate(dataCSV[2]);
              dataFormat.qt = JSON.parse(dataCSV[3]);
              dataFormat.price = JSON.parse(dataCSV[4].replace(',', '.').trim()) as number;
              if (dataFormat.code) {
                catArray.push(dataFormat);
              }
            } catch (error) {
              //  console.log('error', error);
            }
          }
        },
        complete: function () {
          that.navigationService.setProductsAn(
            catArray.filter((thing, i, arr) => arr.findIndex((t) => t.code === thing.code) === i),
          );
          // console.log(catArray);
          // console.log('All done!');
        },
      });
    }
    return catArray;
  }

  mapDate(dateString: string): Date {
    var dateParts = dateString.split('/');

    // month is 0-based, that's why we need dataParts[1] - 1
    return new Date(+'20'.concat(dateParts[2]), +dateParts[1] - 1, +dateParts[0]);
  }
}
