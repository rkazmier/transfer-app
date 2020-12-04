import { TransactionsEntity } from './+state/transactions.models';

export const createTransactionsEntity = (id: string, name = '', amount: number) =>
({
  id,
  transaction: {
    amountCurrency: {
      amount,
      currencyCode: 'EUR'
    },
    type: 'Online Transfer',
    creditDebitIndicator: 'DBIT'
  },
  merchant: {
    name,
    accountNumber: 'test-accountNumber'
  },
  categoryCode: 'test-code',
  dates: {
    valueDate: 1234567890
  }
} as TransactionsEntity);