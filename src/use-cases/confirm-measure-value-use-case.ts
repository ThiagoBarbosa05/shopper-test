import { GlobalErrorHandler } from "../core/error/global-error-handler";
import { MeasureRepository } from "../core/repositories/measure-repository"

type ConfirmMeasureValueUseCaseInput = {
  value: number
  measureId: string
}

export class ConfirmMeasureValueUseCase {

  constructor(private measureRepository: MeasureRepository) {}

  async execute({ value, measureId }: ConfirmMeasureValueUseCaseInput) {
    
    const measure = await this.measureRepository.findById(measureId);


    if(!measure) {
      throw new GlobalErrorHandler("MEASURE_NOT_FOUND", "Leitura do mês já realizada")
    }

    if(measure.isConfirmed === true) {
      throw new GlobalErrorHandler("CONFIRMATION_DUPLICATE", "Leitura do mês já realizada.")
    }

    measure.isConfirmed = true
    measure.value = value

   await this.measureRepository.save(measure)
  
  }
}