import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadService } from '../../../core/services/upload-service';
import { NavigationService } from '../../../core/services/navigation-service';
import { RouterLink } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { ServerStorage } from '../../../ai/server-storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { env } from '../../../env';
import { CategoryService } from '../../../ai/category-service';

@Component({
  selector: 'app-upload-view',
  imports: [RouterLink, TranslatePipe],
  providers: [ServerStorage ],
  templateUrl: './upload-view.html',
  styleUrl: './upload-view.css',
})
export class UploadView {
  modalService = inject(NgbModal);
  uploadService = inject(UploadService);
  naviagationService = inject(NavigationService);
  catService = inject(CategoryService);

  loadAnnualFile(file?: FileList | null) {
    // let dataFile = this.uploadService.getDistinctProducts();
    // this.naviagationService.setProductsAn(dataFile);
  }

  loadDailyFile(file?: FileList | null) {
    let dataFile = this.uploadService.loadDailyFile(file);
    this.naviagationService.setProductsDaily(dataFile);

    console.log("dataFile size", new Blob([JSON.stringify(dataFile)]).size,"bytes");
   
  
    
    // if (dataFile.length>0) {
    //    console.log("saving data to Firestore");
    //   for (let index = 0; index < dataFile.length; index++) {
    //   const element = dataFile[index];
    //   this.serverStorage.addItem(element).then(() => {
    //     console.log("Data saved to Firestore");
    //   }).catch((error) => {
    //     console.error("Error saving data to Firestore", error);
    //   });
    // }
    // }
    
   
    // this.serverStorage.addAllItems(dataFile).then(() => {
    //   console.log("Data saved to Firestore");
    // }).catch((error) => {
    //   console.error("Error saving data to Firestore", error);
    // }); 

    //get distinct products
    // this.naviagationService.setProductsAn(this.uploadService.getDistinctProducts());
  }

  

  genReports() {}
}
