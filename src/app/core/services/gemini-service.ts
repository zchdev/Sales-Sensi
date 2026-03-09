import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class GeminiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/gemini/chat'; // NestJS endpoint
  askGemini(prompt: string) {
    return this.http.post<{ response: string }>(this.apiUrl, { prompt });
  }
}
