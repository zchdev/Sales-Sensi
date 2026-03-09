import { Component, DestroyRef, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CameraService } from '../../../ai/camera';
import { GeminiLiveService } from '../../../ai/gemini-live';
import { VoiceRecognitionService } from '../../../ai/voice-recognition';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sensei-view',
  imports: [],
  providers: [GeminiLiveService, VoiceRecognitionService, CameraService],
  templateUrl: './sensei-view.html',
  styleUrl: './sensei-view.css',
})
export class SenseiView implements OnInit {
  @ViewChild('vPlayer') vPlayer!: ElementRef;
  private destroyRef = inject(DestroyRef);
  gemini = inject(GeminiLiveService);
  voice = inject(VoiceRecognitionService);
  camera = inject(CameraService);

  responseText = signal('');
  isAITalking = false;

  async ngOnInit() {
    const stream = await this.camera.getStream();
    this.vPlayer.nativeElement.srcObject = stream;
    this.camera.video.srcObject = stream;
    this.camera.video.play();

    this.voice.text$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(text => this.handleUserQuery(text));
    
    // BARGE-IN: If user speaks, stop the AI voice immediately
    if (this.voice.recognition) {
      this.voice.recognition.onspeechstart = () => {
        if (this.isAITalking) {
          window.speechSynthesis.cancel();
        }
        this.voice.interrupt();
        this.isAITalking = false;
      };
    }
  }

  stopSession() {
    this.voice.stop();
    this.responseText.set('');
    this.isAITalking = false;
    window.speechSynthesis.cancel();
  }

  async handleUserQuery(text: string) {
    this.responseText.set('Analyzing...');
    const frame = this.camera.getFrame();
    const result = await this.gemini.getResponse(text, frame);
    
    let fullText = "";
    for await (const chunk of result.stream) {
      fullText += chunk.text();
      this.responseText.set(fullText);
    }
    this.speak(fullText);
  }

  speak(text: string) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.onstart = () => this.isAITalking = true;
    utter.onend = () => this.isAITalking = false;
    window.speechSynthesis.speak(utter);
  }
}

