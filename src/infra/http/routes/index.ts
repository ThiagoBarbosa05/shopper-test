import {Router} from 'express'
import { createMeasureController } from '../controllers/create-measure-controller'
import { confirmMeasureValueController } from '../controllers/confirm-measure-value-controller'
import { listCustomerMeasureController } from '../controllers/list-customer-measure-controller'

export const routes = Router()

routes.post("/upload", createMeasureController)

routes.patch('/confirm', confirmMeasureValueController)

routes.get('/:customerCode/list', listCustomerMeasureController)