import { PrismaMeasureRepository } from "../infra/database/repositories/prisma-measure-repository";
import { ConfirmMeasureValueUseCase } from "../use-cases/confirm-measure-value-use-case";

export function makeConfirmMeasureValueUseCase() {
  const prismaMeasureRepository = new PrismaMeasureRepository()
  const confirmMeasureValueUseCase = new ConfirmMeasureValueUseCase(prismaMeasureRepository)

  return confirmMeasureValueUseCase
}