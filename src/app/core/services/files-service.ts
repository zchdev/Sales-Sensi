import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private filesInMemory = null;

  getFilesInMemory(): number | null {
    return this.filesInMemory;
  }
}
