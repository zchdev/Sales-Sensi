import { Component, inject, signal } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { env } from './env';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AngularFirestoreModule,],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  private translate = inject(TranslateService);

  constructor() {
    //set lng
    this.translate.addLangs(['fr', 'en']);
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }
}
