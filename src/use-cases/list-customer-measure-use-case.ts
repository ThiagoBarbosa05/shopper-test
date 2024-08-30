import { GlobalErrorHandler } from "../core/error/global-error-handler"
import { MeasureRepository } from "../core/repositories/measure-repository"

type ListCustomerMeasureUseCaseInput = {
  measureType: 'GAS' | 'WATER' | undefined
  customerCode: string
}

export class ListCustomerMeasureUseCase {

  constructor(private measureRepository: MeasureRepository) {}

  async execute({ measureType, customerCode }: ListCustomerMeasureUseCaseInput) {
    
    const measureList = await this.measureRepository.findAllByCustomerCodeAndType({ customerCode, measureType })

    if(measureList.length <= 0) {
      throw new GlobalErrorHandler("MEASURES_NOT_FOUND", "Nenhuma leitura encontrada")
    }

    return measureList

  }
}
