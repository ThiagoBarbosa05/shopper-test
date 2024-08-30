import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { makeListCustomerMeasureUseCase } from "../../../factories/make-list-customer-measure";
import { GlobalErrorHandler } from "../../../core/error/global-error-handler";

enum MeasureType {
  GAS = 'GAS',
  WATER = 'WATER'
}

const queryParamsSchema = z.object({
  measure_type: z
    .string()
    .optional()
    .transform(value => value?.toUpperCase())
    .refine(value => value === undefined || Object.values(MeasureType).includes(value as MeasureType))
    .transform(value => (value ? (value as MeasureType) : undefined))
})

export async function listCustomerMeasureController(req: Request, res: Response)  {
  
  try {

    const { measure_type } = queryParamsSchema.parse(req.query)
    const { customerCode } = req.params

    const listCustomerMeasureUseCase = makeListCustomerMeasureUseCase()

    const listMeasure = await listCustomerMeasureUseCase.execute({ customerCode, measureType: measure_type })

    return res.status(200).send({
      customer_code: customerCode,
      measures: listMeasure.map(measure => ({
        measure_uuid: measure.id,
        measure_datetime: measure.datetime,
        measure_type: measure.type,
        has_confirmed: measure.isConfirmed,
        image_url: measure.imageUrl
      }))
    })

  } catch (error) {
    if(error instanceof ZodError ) {
        return res.status(400).send({
          error_code: "INVALID_TYPE",
          error_description: "Tipo de medição não permitida"
        })
      }

      if(error instanceof GlobalErrorHandler) {
        switch(error.errorCode) {
          case "MEASURES_NOT_FOUND":
            return res.status(404).send({error_code: error.errorCode, error_description: error.errorDescription
            })
        }
      }
  }
 
}