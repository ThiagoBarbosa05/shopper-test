import { GoogleGenerativeAI } from "@google/generative-ai";
import { GenerativeAi, GenerativeAiParams } from "../../core/services/generative-ai";
import { env } from "../config/env";

export class GoogleGemini implements GenerativeAi {

  private googleGenerativeAI: GoogleGenerativeAI;

  constructor() {
    this.googleGenerativeAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  }

  async generate({ prompt, imageBase64 }: GenerativeAiParams): Promise<string> {
    
    const model = this.googleGenerativeAI.getGenerativeModel({model: 'gemini-1.5-flash', generationConfig: {
      responseMimeType: 'application/json',
    }})

    const generatedContent = await model.generateContent([
      {
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg"
        }
      },
      {
         text: `${prompt} usando esse JSON schema:
          {"type": "object",
            "properties": {
              "value": {"type": "integer"},
            }
          }
        `}
    ])

    return generatedContent.response.text()
  }
}