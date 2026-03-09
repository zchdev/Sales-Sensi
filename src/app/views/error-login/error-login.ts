import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { JSAnimation, EasingParam, animate, spring } from 'animejs';

@Component({
  selector: 'app-error-login',
  imports: [],
  templateUrl: './error-login.html',
  styleUrl: './error-login.css',
})
export class ErrorLogin implements AfterViewInit {
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
  }
}
