import { Uploader, UploadParams, UploadResponse } from "../../core/storage/uploader";
import { GoogleAIFileManager } from "@google/generative-ai/server";

import { env } from "../config/env";

export class GoogleFileStorage implements Uploader {

  private fileManager: GoogleAIFileManager;

  constructor() {
    this.fileManager = new GoogleAIFileManager(env.GEMINI_API_KEY);
  }

  async upload({ filepath, mimeType }: UploadParams): Promise<UploadResponse> {
    
    const uploadResponse = await this.fileManager.uploadFile(filepath, {
      mimeType: mimeType,
    })

    return {
      imageUrl: uploadResponse.file.uri
    }
  }
}