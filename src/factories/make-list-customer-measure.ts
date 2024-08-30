import { PrismaMeasureRepository } from "../infra/database/repositories/prisma-measure-repository"
import { ListCustomerMeasureUseCase } from "../use-cases/list-customer-measure-use-case"

export function makeListCustomerMeasureUseCase() {
  const prismaMeasureRepository = new PrismaMeasureRepository()
  const listCustomerMeasureUseCase = new ListCustomerMeasureUseCase(prismaMeasureRepository)

  return listCustomerMeasureUseCase

}