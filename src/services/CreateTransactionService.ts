import {TransactionsRepository} from '../repositories/TransactionsRepository';
import Transaction, {TypesTransaction} from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transactionRequest:Transaction): Transaction {

    if(!TypesTransaction.includes(transactionRequest.type))
      throw `type is mandatory and needs to be income or outcome`

    const {total} = this.transactionsRepository.getBalance()

    if(transactionRequest.value <= 0)
      throw `It is not allowed to carry out an operation with a negative or zero value`

    if(transactionRequest.type === "outcome" && total < transactionRequest.value)
      throw `You do not have enough balance`

    return this.transactionsRepository.create(transactionRequest)
  }
}

export default CreateTransactionService;
