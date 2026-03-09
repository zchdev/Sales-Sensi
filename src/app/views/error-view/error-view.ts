import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { JSAnimation, EasingParam, animate, spring } from 'animejs';
import { GeminiService } from '../../core/services/gemini-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-error-view',
  imports: [RouterModule, TranslatePipe],
  providers: [GeminiService],
  templateUrl: './error-view.html',
  styleUrl: './error-view.css',
})
export class ErrorView implements AfterViewInit {
  @ViewChild('box') box!: ElementRef;
  private _animeAnimation: JSAnimation | undefined = undefined;

  ngAfterViewInit(): void {
    this.animateCard('easeInOut');
  }

  animateCard(ease: EasingParam): void {
    this._animeAnimation = animate(this.box.nativeElement, {
      scale: [
        { to: 0.9, ease: 'inOut(20)', duration: 10 },
        { to: 1, ease: spring({ bounce: 0.7 }) },
      ],

      ease: 'out',
      loop: true,
      loopDelay: 20,
    });
    // this._animeAnimation
    //   .then(() => {
    //     this._animeAnimation = animate(this.box.nativeElement, {
    //       x: 0,
    //       duration: 500,
    //       ease,
    //     });
    //   })
    //   .catch(() => {
    //     this.box.nativeElement.x = 0;
    //   });
  }
  constructor(private geminiService: GeminiService) {
    // this.initWS();
  }

  response = signal('');
  loading = signal(false);

  send(prompt: string) {
    this.loading.set(true);
    this.geminiService.askGemini('what is AI ?').subscribe((res) => {
      console.log('res', res);
      this.response.set(res.response);
      this.loading.set(false);
    });
  }

  sendAll() {
    const historicalData = [
      { year: 2022, revenue: 120000 },
      { year: 2023, revenue: 145000 },
      { year: 2024, revenue: 160000 },
      { year: 2025, revenue: 190000 },
    ];
    const prompt =
      ' You are a forecasting API ' +
      'Input: JSON array of objects from 2022 to 2025.' +
      'Task: Generate forecast for year 2026.' +
      'Rules:' +
      '- Output ONLY valid JSON ' +
      '- Output must be an array ' +
      '- Use same attributes as input ' +
      '- Year must be 2026 ' +
      '- No markdown ' +
      '- No explanation' +
      ' . Here is the JSON array of objects from 2022 to 2025' +
      JSON.stringify(historicalData);

    this.loading.set(true);
    this.geminiService.askGemini(prompt).subscribe((res) => {
      console.log('res', res);
      console.log('res.re', res.response);
      this.response.set(res.response);
      this.loading.set(false);
    });
  }

  //waking up the api
  private http = inject(HttpClient);
  initWS() {
    console.log('PINGING API');
    this.http.get<{ response: string }>('https://gemini-forecast-api.onrender.com').subscribe({
      next: (res) => {
        console.log('API IS AWAKE', res);
      },
      error: (err) => {
        console.log('API ERROR');
      },
    });
  }
}
