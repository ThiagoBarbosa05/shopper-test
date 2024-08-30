export type UploadParams = {
  filepath: string
  mimeType: string
}

export type UploadResponse = {
  imageUrl: string
}

export interface Uploader {
  upload(params: UploadParams): Promise<UploadResponse>
}