export type GenerativeAiParams = {
  prompt: string
  imageBase64: string
}

export interface GenerativeAi {
  generate({ prompt, imageBase64 }: GenerativeAiParams): Promise<string> 
}