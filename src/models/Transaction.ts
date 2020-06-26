import { uuid } from 'uuidv4';


export const TypesTransaction = new Array('income', 'outcome')


class Transaction {
  id: string;

  title: string;

  value: number;

  type: 'income' | 'outcome'

  constructor(data:Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = data.title;
    this.value = data.value;
    this.type = data.type;
  }
}

export default Transaction;
