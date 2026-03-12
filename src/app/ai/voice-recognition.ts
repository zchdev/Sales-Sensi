import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VoiceRecognitionService {
  recognition: any;
  text$ = new Subject<string>();
  bargeIn$ = new Subject<void>();
  isListening = false;

  constructor(private zone: NgZone) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.onresult = (event: any) => {
        const result = event.results[event.results.length - 1];
        if (result.isFinal) {
          const text = result[0].transcript.trim();
          if (text) this.zone.run(() => this.text$.next(text));
        } else {
          this.zone.run(() => this.bargeIn$.next());
        }
      };
    }
  }

  start() { 
    if (!this.recognition) {
      alert('Speech recognition is not supported in this browser. Please use the latest version of Google Chrome.');
      console.error('Speech recognition is not supported in this browser. Please use the latest version of Google Chrome.');
      return;
    }
    this.recognition.start(); 
    this.isListening = true; 
  }
  
  stop() { 
    this.isListening = false; 
    window.speechSynthesis.cancel();
    if (this.recognition) {
      this.recognition.abort(); 
    }
  }

    speak(text: string, onStart: () => void, onEnd: () => void) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.onstart = onStart;
    utter.onend = onEnd;
    window.speechSynthesis.speak(utter);
  }

   interrupt() {
    window.speechSynthesis.cancel();
  }
}