import { Measure } from "../../entities/measure";

export type MeasureRepositoryResponse = {
  measureId: string,
  measureValue: number
}

export type FindAllByCustomerCodeAndTypeParams = {
  customerCode: string,
  measureType: 'GAS' | 'WATER' | undefined
}

export type FindByDatetimeParams = {
  datetime: string
  customerCode: string
  type: 'GAS' | 'WATER'
}

export interface MeasureRepository {
  create(measure: Measure): Promise<MeasureRepositoryResponse>
  findById(id: string): Promise<Measure | null>
  findByDatetime(params: FindByDatetimeParams): Promise<Measure | null>
  save(measure: Measure): Promise<void>
  findAllByCustomerCodeAndType(params: FindAllByCustomerCodeAndTypeParams): Promise<Measure[] | []>
}