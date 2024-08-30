import { Request, Response } from "express"
import {z, ZodError} from "zod"
import { makeUploadImageUseCase } from "../../../factories/make-upload-image"
import { makeCreateMeasureUseCase } from "../../../factories/make-create-measure"
import { GlobalErrorHandler } from "../../../core/error/global-error-handler"

const uploadRequestBodySchema = z.object({
  image: z.string().refine(file => {
    const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/
    return base64Regex.test(file)
  }, {message: "formato de imagem inválido"}),
  customer_code: z.string().min(1, {message: "Insira o código do cliente."}),
  measure_datetime: z.string().datetime({message: "Formato de data inválido, deve ser em UTC."}),
  measure_type: z.enum(['WATER', 'GAS'])
})

export async function createMeasureController(req: Request, res: Response) {

  try {

    const { customer_code, image, measure_datetime, measure_type } = uploadRequestBodySchema.parse(req.body)

    const uploadImageUseCase = makeUploadImageUseCase()

    const { imageUrl } = await uploadImageUseCase.execute({ imageBase64: image })

    const createMeasureUseCase = makeCreateMeasureUseCase()

    const generatedMeasure = await createMeasureUseCase.execute({
      customerCode: customer_code, 
      imageBase64: image, 
      measureType: measure_type, 
      measureDatetime: measure_datetime, 
      imageUrl
    })

    return res.status(200).send({
      image_url: imageUrl,
      measure_value: generatedMeasure.measureValue,
      measure_uuid: generatedMeasure.measureId
    })

        
  } catch (error) {    
    if(error instanceof ZodError) {
      return res.status(400).send({error_code: "INVALID_DATA", error_description: "Dados incompletos/inválidos fornecidos."
      })
    }

    if(error instanceof GlobalErrorHandler) {
      switch(error.errorCode) {
        case "DOUBLE_REPORT":
          return res.status(404).send({error_code: error.errorCode, error_description: error.errorDescription
          })
      }
    }

      return res.status(500).send({error_code: "SERVER_ERROR", error_description: "Erro no servidor"
    
    })
  }
}