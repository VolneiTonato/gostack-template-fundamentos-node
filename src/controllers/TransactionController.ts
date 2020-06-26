import { Response, Request, NextFunction } from 'express'
import { ExceptionError, CodeError } from '../exceptions/customException'
import TransactionModel from '../models/Transaction'
import { isUuid } from 'uuidv4'
import { transactionRepository } from '../repositories/TransactionsRepository'
import CreateTransactionService from '../services/CreateTransactionService'

class TransactionController {

  validateParams(req: Request, res: Response, next: NextFunction) {
    try {
      const { body: transactionRequest }: { body: TransactionModel } = req

      let erros = []

      if (!transactionRequest.title || String(transactionRequest.title).length == 0)
        erros.push(`Title is required!`)

      if (!transactionRequest.value || !isFinite(transactionRequest.value))
        erros.push(`Value is mandatory and must be in currency format`)

      if (!transactionRequest.type)
        erros.push(`type is required!`)




      if (erros.length)
        throw erros.join(' - ')

      next()

    } catch (err) {
      next(new ExceptionError({ message: String(err), status: CodeError.BAD_REQUEST }))
    }
  }

  validateId(req: Request, res: Response, next: NextFunction) {
    try {

      const { id } = req.params

      if (!isUuid(id))
        throw `ID is invalid!`

      next()

    } catch (err) {
      next(new ExceptionError({ message: String(err), status: CodeError.BAD_REQUEST }))
    }
  }


  async getBalance(req: Request, res: Response, next: NextFunction) {
    res.json(transactionRepository.getBalance())
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const transactionList = transactionRepository.find()
      const balance = transactionRepository.getBalance()

      res.json({ transactions: transactionList, balance })
    } catch (err) {
      next(new ExceptionError({ message: String(err), status: CodeError.BAD_REQUEST }))
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const transaction = transactionRepository.findOne({ id: id })

      res.json(transaction)
    } catch (err) {
      next(new ExceptionError({ message: String(err), status: CodeError.BAD_REQUEST }))
    }
  }


  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body: transactionRequest }: { body: TransactionModel } = req

      const transactionCreate = new CreateTransactionService(transactionRepository).execute(transactionRequest)

      res.json(transactionCreate)

    } catch (err) {
      next(new ExceptionError({ message: String(err), status: CodeError.BAD_REQUEST }))
    }

  }

}

export const transactionController = new TransactionController()
