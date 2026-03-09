import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CameraService {
  video = document.createElement('video');
  canvas = document.createElement('canvas');

  async getStream() {
    return await navigator.mediaDevices.getUserMedia({ video: true });
  }

  getFrame(): string {
    this.canvas.width = 640;
    this.canvas.height = 480;
    const ctx = this.canvas.getContext('2d');
    ctx?.drawImage(this.video, 0, 0, 640, 480);
    return this.canvas.toDataURL('image/jpeg', 0.5).split(',')[1];
  }
}