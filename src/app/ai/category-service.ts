import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc, writeBatch, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private firestore: Firestore = inject(Firestore);

  /**
   * Option A: Save each year as a separate document in a collection
   * Best for scalability and querying specific years.
   */
  async saveYearsAsDocuments(data: any[]) {
    const colRef = collection(this.firestore, 'statistics');
    const batch = writeBatch(this.firestore);

    data.forEach((yearData) => {
      // Create a clean POJO and remove 'undefined' (Firestore hates undefined)
      const cleanData = JSON.parse(JSON.stringify(yearData));
      
      // We use a specific ID (the year) so we don't get duplicates
      const docRef = doc(this.firestore, `statistics/${yearData.year}`);
      batch.set(docRef, cleanData);
    });

    return await batch.commit();
  }
  

  /**
   * Option B: Save the entire array into a single "Master" document
   * Best if the dataset is small and always used together.
   */
  async saveFullHistory(data: any[]) {
    const docRef = doc(this.firestore, 'statistics/yearly_summary');
    const cleanData = JSON.parse(JSON.stringify(data));
    
    // Firestore needs an object at the top level, not a raw array
    return await setDoc(docRef, { history: cleanData });
  }

getAllHistory(): Observable<any> {
  const docRef = doc(this.firestore, 'statistics/yearly_summary');
  return docData(docRef) as Observable<any>;
}
}