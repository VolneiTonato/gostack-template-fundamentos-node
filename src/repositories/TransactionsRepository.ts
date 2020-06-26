import Transaction from '../models/Transaction';
import { find as lodashFind, filter as lodashFilter } from 'lodash'

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

export class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  findOne(param: Partial<Transaction>): Transaction {

    const where: { [key: string]: string | number | Date | null } = {}

    for (let [propertie, value] of Object.entries(param)) {

      if (value)
        where[propertie] = value
    }

    const transaction = lodashFind(this.transactions, where) as Transaction


    return transaction || {}

  }

  public find(param?: Partial<Transaction>): Transaction[] {

    const where: { [key: string]: string | number | Date | null } = {}

    if (param) {

      for (let [propertie, value] of Object.entries(param)) {

        if (value)
          where[propertie] = value
      }
      if (where)
        return lodashFilter(this.transactions, where) as Transaction[]

    }

    return this.transactions
  }

  public getBalance(): Balance {

    const {income, outcome} = this.transactions.reduce((acumulator, transaction) => {
      if (transaction.type === 'income')
        acumulator.income += Number(transaction.value)
      else if (transaction.type === 'outcome')
        acumulator.outcome += Number(transaction.value)

      return acumulator
    }, {
      income: 0,
      outcome: 0
    })

    const total = income - outcome

    return {total, income, outcome}
  }

  public create(data: Transaction): Transaction {

    let transaction = new Transaction(data)

    this.transactions.push(transaction)


    return transaction
  }
}

export const transactionRepository = new TransactionsRepository()
