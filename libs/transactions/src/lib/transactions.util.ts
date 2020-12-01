import { TransactionsEntity } from './+state/transactions.models';
import { CreditDebitIndicator, TransactionType } from './data.model';

export const createTransaction = (toAcc: string, amount: string): TransactionsEntity => {
    return {
        id: Math.floor(Math.random() * 10000000),
        categoryCode: "#12a580",
        dates: {valueDate: new Date().toISOString()},
        transaction: {
            amountCurrency: {
                amount: Number(amount)*-1,
                currencyCode: "EUR"
            },
            type: TransactionType.Online,
            creditDebitIndicator: CreditDebitIndicator.Debit
        },
        merchant: {
            name: toAcc,
            accountNumber: "SI64397745065188826"
        }
    };
};

