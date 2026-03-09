import { inject, Injectable, OnInit } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../env';

@Injectable({ providedIn: 'root' })
export class GeminiLiveService implements OnInit{
  public history = " Data: 2022(1.2M), 2023(1.5M), 2024(1.8M), 2025(Trending up)."
  private genAI = new GoogleGenerativeAI(env.geminiApiKey);
  private model = this.genAI.getGenerativeModel({
    model: "gemini-3-flash-preview", // Optimized for Live/Multimodal
    systemInstruction: `You are Sales Sensei. 
      Role: Analyze charts I show you and answer voice questions. 
      Be concise. If the user interrupts, stop and listen.`
  });

  public chatSession = this.model.startChat();
  

  async getResponse(prompt: string, imageBase64?: string) {
    const parts: any[] = [{ text: prompt }];
    if (imageBase64) {
      parts.push({ inlineData: { mimeType: 'image/jpeg', data: imageBase64 } });
    }
    return await this.chatSession.sendMessageStream(parts);
  }

  ngOnInit(): void {
 

   

  }
}