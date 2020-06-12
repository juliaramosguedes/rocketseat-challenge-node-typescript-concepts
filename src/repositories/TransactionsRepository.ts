import Transaction from '../models/Transaction';

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): BalanceDTO {
    const balance = this.transactions.reduce(
      (accumulator: BalanceDTO, transaction: Transaction) => {
        if (transaction.type === 'income') {
          accumulator.income += transaction.value;
        }
        if (transaction.type === 'outcome') {
          accumulator.outcome += transaction.value;
        }

        accumulator.total = accumulator.income - accumulator.outcome;
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
