import { createAction, props } from '@ngrx/store';
import { OperationModel, TransferOrderModel } from '../data.model';
import { TransactionsEntity } from './transactions.models';

export const loadTransactions = createAction(
  '[Transactions] Load Transactions'
);

export const loadTransactionsSuccess = createAction(
  '[Transactions] Load Transactions Success',
  props<{ transactions: TransactionsEntity[] }>()
);

export const loadTransactionsFailure = createAction(
  '[Transactions] Load Transactions Failure',
  props<{ error: any }>()
);

export const makeTransaction = createAction(
  '[Transactions] Make Transaction',
  props<{ order: TransferOrderModel }>()
);

export const makeTransactionSuccess = createAction(
  '[Transactions] Make Transaction Success',
  props<{ transaction: TransactionsEntity }>()
);

export const makeTransactionFailure = createAction(
  '[Transactions] Make Transaction Failure',
  props<{ error: any }>()
);