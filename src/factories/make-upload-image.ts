import { GoogleFileStorage } from "../infra/storage/google-file-storage"
import { UploadImageUseCase } from "../use-cases/upload-image-use-case"

export function makeUploadImageUseCase() {
  const googleFileStorage = new GoogleFileStorage()
  const uploadImageUseCase = new UploadImageUseCase(googleFileStorage)

  return uploadImageUseCase
}