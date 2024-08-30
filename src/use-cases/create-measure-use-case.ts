import { GlobalErrorHandler } from "../core/error/global-error-handler"
import { MeasureRepository } from "../core/repositories/measure-repository"
import { GenerativeAi } from "../core/services/generative-ai"
import { Measure } from "../entities/measure"

type CreateMeasureUseCaseInput = {
  customerCode: string,
  measureDatetime: string,
  measureType: 'GAS' | 'WATER',
  imageBase64: string,
  imageUrl: string
}

type CreateMeasureUseCaseOutput = {
  measureId: string,
  measureValue: number
}


export class CreateMeasureUseCase {

  constructor(
    private generateAi: GenerativeAi,
    private measureRepository: MeasureRepository
  ) {}

  async execute({ 
    customerCode, 
    measureDatetime, 
    measureType,
    imageBase64,
    imageUrl
  }: CreateMeasureUseCaseInput): Promise<CreateMeasureUseCaseOutput> {
      
    const hasMeasureInSameMonth = await this.measureRepository.findByDatetime({customerCode, datetime: measureDatetime, type: measureType})

    if(hasMeasureInSameMonth) {
      throw new GlobalErrorHandler("DOUBLE_REPORT", "Leitura do mês já realizada")
    }
    
    const promptToAI = measureType === 'GAS' ? "Extraia o valor numérico do medidor de gás nesta imagem. O resultado deve ser um número representando o consumo de gás em metros cúbicos." : "Extraia o valor numérico do medidor de água nesta imagem. O resultado deve ser um número representando o consumo de água em litros."

    const aiGeneratedMeasurementValue = await this.generateAi.generate({prompt: promptToAI, imageBase64});

    const aiGeneratedMeasurementValueToJSON = JSON.parse(aiGeneratedMeasurementValue)

    const measure = Measure.create({
      customerCode,
      datetime: measureDatetime,
      type: measureType,
      value: aiGeneratedMeasurementValueToJSON.value,
      isConfirmed: false,
      imageUrl
    })

    const measureSavedOnDatabase = await this.measureRepository.create(measure)

    return {
      measureId: measureSavedOnDatabase.measureId,
      measureValue: measureSavedOnDatabase.measureValue
    }
  }
}