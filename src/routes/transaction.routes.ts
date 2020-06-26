import { Router } from 'express';
import {transactionController} from '../controllers/TransactionController'

const router = Router()

router.route('/').get(transactionController.index)

router.route('/balance').get(transactionController.getBalance)

router.route('/').post(transactionController.validateParams).post(transactionController.create)


router.route('/:id').get(transactionController.validateId).get(transactionController.show)

export const RouterTransaction = {
  route: '/transactions',
  router
}
