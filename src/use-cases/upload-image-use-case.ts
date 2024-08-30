import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
import { Uploader } from '../core/storage/uploader'

type UploadImageUseCaseInput = {
  imageBase64: string
}

type UploadImageUseCaseOutput = {
  imageUrl: string
}

export class UploadImageUseCase {

  constructor(
    private uploader: Uploader
  ) {}

  async execute({ imageBase64 }: UploadImageUseCaseInput): Promise<UploadImageUseCaseOutput> {

    const buffer = Buffer.from(imageBase64, 'base64')


    const __filename = fileURLToPath(import.meta.url)
 
    const __dirname = path.dirname(__filename)

    const filepath = path.join(__dirname, "tempImage.png")

    fs.writeFileSync(filepath, buffer)

    const { imageUrl } = await this.uploader.upload({ filepath, mimeType: "image/jpg" })

    fs.unlinkSync(filepath)

    return {
      imageUrl
    }
  }
}