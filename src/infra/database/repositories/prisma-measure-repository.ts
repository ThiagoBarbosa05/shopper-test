import { addMonths, format } from "date-fns";
import { FindAllByCustomerCodeAndTypeParams, FindByDatetimeParams, MeasureRepository, MeasureRepositoryResponse } from "../../../core/repositories/measure-repository";
import { Measure } from "../../../entities/measure";
import { prisma } from "../prisma";

export class PrismaMeasureRepository implements MeasureRepository {

  async findByDatetime({customerCode, datetime, type}: FindByDatetimeParams): Promise<Measure | null> {
    const beginningMonth = format(new Date(datetime), "MM")
    const beginningNextMonth = format(addMonths(beginningMonth, 1), "MM")
    const year = new Date(datetime).getFullYear()

    const measure = await prisma.measure.findFirst({
      where: {
        customerCode,
        type,
        AND: [
            {
              datetime: {
                gte: `${year}-${beginningMonth}-01T00:00:00.000Z` // Início do mês
              },    
            },
            {
              datetime: {
                lte: `${year}-${beginningNextMonth}-01T00:00:00.000Z` // Início do próximo mês
              }
            }
        ]
      }
    })

    if(!measure) {
      return null
    }

    return Measure.create({
      customerCode: measure.customerCode,
      datetime: measure.datetime.toISOString(),
      imageUrl: measure.imageUrl,
      isConfirmed: measure.isConfirmed,
      type: measure.type,
      value: measure.value
    }, 
      measure.id
    )

  }


  async findAllByCustomerCodeAndType({ customerCode, measureType }: FindAllByCustomerCodeAndTypeParams): Promise<Measure[] | []> {
    
    const measureList = await prisma.measure.findMany({
      where: {
        customerCode,
        type: measureType
      }, 
    })

    return measureList.map(measure => Measure.create({
      customerCode: measure.customerCode,
      datetime: measure.datetime.toISOString(),
      imageUrl: measure.imageUrl,
      isConfirmed: measure.isConfirmed,
      type: measure.type,
      value: measure.value
    },
      measure.id
  ))
  }

  async findById(id: string): Promise<Measure | null> {
    const measureFromDatabase = await prisma.measure.findUnique({
      where: {
        id,
      }
    })

    if(!measureFromDatabase) {
      return null
    }

    const measure = Measure.create({
      customerCode: measureFromDatabase.customerCode,
      datetime: measureFromDatabase.datetime.toISOString(),
      isConfirmed: measureFromDatabase.isConfirmed,
      type: measureFromDatabase.type,
      value: measureFromDatabase.value,
      imageUrl: measureFromDatabase.imageUrl
    }, 
    measureFromDatabase.id
  )
    
    return measure

  }

  async save(measure: Measure): Promise<void> {
      await prisma.measure.update({
        where: {
          id: measure.id
        },
        data: {
          isConfirmed: measure.isConfirmed,
          value: measure.value
        }
      })
  }

  async create(measure: Measure): Promise<MeasureRepositoryResponse> {
    
    const measureCreated = await prisma.measure.create({
      data: {
        customerCode: measure.customerCode,
        datetime: measure.datetime,
        isConfirmed: measure.isConfirmed,
        value: measure.value,
        type: measure.type,
        imageUrl: measure.imageUrl
      }
  })
    return {
      measureId: measureCreated.id,
      measureValue: measureCreated.value
    }
}

}