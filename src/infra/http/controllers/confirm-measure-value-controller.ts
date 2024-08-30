import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { makeConfirmMeasureValueUseCase } from "../../../factories/make-confirm-measure-value";
import { GlobalErrorHandler } from "../../../core/error/global-error-handler";

const confirmRequestBodySchema = z.object({
  measure_uuid: z.string().uuid(),
  confirmed_value: z.coerce.number()
})

export async function confirmMeasureValueController(req: Request, res: Response)  {

  try {
    const { measure_uuid, confirmed_value } = confirmRequestBodySchema.parse(req.body)

    const confirmMeasureValueUseCase = makeConfirmMeasureValueUseCase()
    await confirmMeasureValueUseCase.execute({ measureId: measure_uuid, value: confirmed_value })

    res.status(200).send({ success: true })

  } catch (error) {
    if(error instanceof ZodError) {
      return res.status(400).send({error_code: "INVALID_DATA", error_description: "Dados incompletos/inválidos fornecidos."
      })
    }
    if(error instanceof GlobalErrorHandler) {
      switch(error.errorCode) {
        case "MEASURE_NOT_FOUND":
          return res.status(404).send({ error_code: error.errorCode, error_description: error.errorDescription })
        case "CONFIRMATION_DUPLICATE":
          return res.status(409).send({ error_code: error.errorCode, error_description: error.errorDescription })
      }
    }
  }
}