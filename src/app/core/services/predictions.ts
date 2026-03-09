import { Injectable } from '@angular/core';
import { AnCategory } from '../models/an-category';

@Injectable({
  providedIn: 'root',
})
export class PredictionsService {
  predictionsOverview: AnCategory | null = null;
}
