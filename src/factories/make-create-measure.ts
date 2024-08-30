import { GoogleGemini } from "../infra/ai/google-gemini"
import { PrismaMeasureRepository } from "../infra/database/repositories/prisma-measure-repository"
import { CreateMeasureUseCase } from "../use-cases/create-measure-use-case"

export function makeCreateMeasureUseCase() {
  const googleGemini = new GoogleGemini()
  const prismaMeasureRepository = new PrismaMeasureRepository()
  const createMeasureUseCase = new CreateMeasureUseCase(googleGemini, prismaMeasureRepository)

  return createMeasureUseCase
  
}