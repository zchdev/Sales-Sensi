import { inject, Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore'; // MODULAR IMPORT
import { DayCategory } from '../core/models/day-category';
import { map, Observable } from 'rxjs';
import as from '@angular/common/locales/as';
import { AnCategory } from '../core/models/an-category';

@Injectable({
  providedIn: 'root'
})
export class ServerStorage {
   private firestore = inject(Firestore);

  // Collections
  private historyCollection: CollectionReference<any>;
  private historyCollectionRef: CollectionReference<string>;

  constructor() {
    
    this.historyCollection = collection (this.firestore, "history") as CollectionReference<AnCategory>;
    this.historyCollectionRef = collection(this.firestore, "history_json") as CollectionReference<string>;
  }
// CREATE
  addItem(item: AnCategory) {
    let ob = [
  {
    "year": 2022,
    "qt": 1497,
    "revenue": 22016.410000000247,
    "months": [
      {
        "label": 0,
        "value": 1259.7000000000003
      },
      {
        "label": 1,
        "value": 1409.7000000000019
      },
      {
        "label": 2,
        "value": 1698.820000000002
      },
      {
        "label": 3,
        "value": 1724.2000000000019
      },
      {
        "label": 4,
        "value": 2340.1000000000045
      },
      {
        "label": 5,
        "value": 2637.5000000000055
      },
      {
        "label": 6,
        "value": 2622.5700000000047
      },
      {
        "label": 7,
        "value": 2106.1100000000024
      },
      {
        "label": 8,
        "value": 942.5299999999997
      },
      {
        "label": 9,
        "value": 2047.8000000000027
      },
      {
        "label": 10,
        "value": 1901.8100000000024
      },
      {
        "label": 11,
        "value": 1325.5699999999997
      }
    ],
    "dayWeek": [
      {
        "label": 0,
        "value": 16.8
      },
      {
        "label": 1,
        "value": 4048.1000000000085
      },
      {
        "label": 2,
        "value": 4309.910000000005
      },
      {
        "label": 3,
        "value": 3573.9200000000064
      },
      {
        "label": 4,
        "value": 3531.060000000006
      },
      {
        "label": 5,
        "value": 3477.650000000006
      },
      {
        "label": 6,
        "value": 3058.9700000000057
      }
    ],
    "nextDays": [
      null,
      null,
      null,
      null,
      null,
      null
    ]
  },
  {
    "year": 2023,
    "qt": 1331,
    "revenue": 19064.830000000027,
    "months": [
      {
        "label": 0,
        "value": 1518.3100000000015
      },
      {
        "label": 1,
        "value": 1333.9500000000005
      },
      {
        "label": 2,
        "value": 1849.5200000000032
      },
      {
        "label": 3,
        "value": 1144.1499999999996
      },
      {
        "label": 4,
        "value": 1639.6600000000008
      },
      {
        "label": 5,
        "value": 2350.5799999999986
      },
      {
        "label": 6,
        "value": 1554.0600000000004
      },
      {
        "label": 7,
        "value": 1407.3200000000004
      },
      {
        "label": 8,
        "value": 1148.6700000000005
      },
      {
        "label": 9,
        "value": 1185.0500000000006
      },
      {
        "label": 10,
        "value": 1739.650000000001
      },
      {
        "label": 11,
        "value": 2193.9100000000008
      }
    ],
    "dayWeek": [
      {
        "label": 0,
        "value": 10.5
      },
      {
        "label": 1,
        "value": 3377.5299999999847
      },
      {
        "label": 2,
        "value": 2578.769999999993
      },
      {
        "label": 3,
        "value": 3295.1499999999833
      },
      {
        "label": 4,
        "value": 2656.7199999999943
      },
      {
        "label": 5,
        "value": 3598.689999999984
      },
      {
        "label": 6,
        "value": 3547.4699999999816
      }
    ],
    "nextDays": [
      null,
      null,
      null,
      null,
      null,
      null
    ]
  },
  {
    "year": 2024,
    "qt": 1620,
    "revenue": 23585.390000000505,
    "months": [
      {
        "label": 0,
        "value": 1661.3200000000013
      },
      {
        "label": 1,
        "value": 1837.5600000000013
      },
      {
        "label": 2,
        "value": 2123.87
      },
      {
        "label": 3,
        "value": 2648.309999999993
      },
      {
        "label": 4,
        "value": 2344.0699999999974
      },
      {
        "label": 5,
        "value": 2071.150000000001
      },
      {
        "label": 6,
        "value": 2306.4599999999973
      },
      {
        "label": 7,
        "value": 1591.0300000000004
      },
      {
        "label": 8,
        "value": 1562.6500000000008
      },
      {
        "label": 9,
        "value": 1482.7500000000007
      },
      {
        "label": 10,
        "value": 1808.750000000001
      },
      {
        "label": 11,
        "value": 2147.4699999999993
      }
    ],
    "dayWeek": [
      {
        "label": 0,
        "value": 33.97
      },
      {
        "label": 1,
        "value": 3887.48999999998
      },
      {
        "label": 2,
        "value": 3565.059999999979
      },
      {
        "label": 3,
        "value": 4077.2999999999747
      },
      {
        "label": 4,
        "value": 3755.9299999999803
      },
      {
        "label": 5,
        "value": 4410.439999999973
      },
      {
        "label": 6,
        "value": 3855.199999999975
      }
    ],
    "nextDays": [
      null,
      null,
      null,
      null,
      null,
      null
    ]
  },
  {
    "year": 2025,
    "qt": 1590,
    "revenue": 25486.680000000477,
    "months": [
      {
        "label": 0,
        "value": 2048.8900000000012
      },
      {
        "label": 1,
        "value": 1611.4500000000005
      },
      {
        "label": 2,
        "value": 2206.98
      },
      {
        "label": 3,
        "value": 2491.1999999999957
      },
      {
        "label": 4,
        "value": 2349.9899999999966
      },
      {
        "label": 5,
        "value": 2883.5299999999907
      },
      {
        "label": 6,
        "value": 2565.149999999995
      },
      {
        "label": 7,
        "value": 1991.0900000000013
      },
      {
        "label": 8,
        "value": 1689.6500000000008
      },
      {
        "label": 9,
        "value": 1714.2700000000007
      },
      {
        "label": 10,
        "value": 1911.5300000000009
      },
      {
        "label": 11,
        "value": 2022.950000000001
      }
    ],
    "dayWeek": [
      {
        "label": 0,
        "value": 0
      },
      {
        "label": 1,
        "value": 4572.529999999974
      },
      {
        "label": 2,
        "value": 4620.639999999974
      },
      {
        "label": 3,
        "value": 4466.369999999977
      },
      {
        "label": 4,
        "value": 3904.82999999998
      },
      {
        "label": 5,
        "value": 3813.35999999998
      },
      {
        "label": 6,
        "value": 4108.949999999981
      }
    ],
    "nextDays": [
      null,
      null,
      null,
      null,
      null,
      null
    ]
  }
]
    return addDoc(this.historyCollection, ob);
  }

  async addMultipleItems(items: any[]) {
  for (const item of items) {
    await addDoc(this.historyCollectionRef, JSON.stringify(item));
  }
}

  // CREATE ALL
  addAllItems(item: DayCategory[]) {
    return addDoc(this.historyCollectionRef, JSON.stringify(item));
  }
   // READ (All)
  getAllItems(): Observable<DayCategory[]> {
    let data = collectionData(this.historyCollectionRef) as Observable<string[]>
    let data2 = data.pipe(map((item) => { for (let i = 0; i < item.length; i++) { JSON.parse(item[i]) as unknown as DayCategory}}));
    return data2 as unknown as Observable<DayCategory[]>;
  }

  // READ (All)
  getItems(): Observable<AnCategory[]> {
    return collectionData(this.historyCollection) as Observable<AnCategory[]>;
  }

  // UPDATE
  updateItem(id: string, data: Partial<AnCategory>) {
    const itemDocRef = doc(this.firestore, `items/${id}`);
    return updateDoc(itemDocRef, data);
  }

  // DELETE
  deleteItem(id: string) {
    const itemDocRef = doc(this.firestore, `items/${id}`);
    return deleteDoc(itemDocRef);
  }
}
