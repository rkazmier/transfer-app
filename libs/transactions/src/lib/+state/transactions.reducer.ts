import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as TransactionsActions from './transactions.actions';
import { TransactionsEntity } from './transactions.models';
import { OperationModel } from '../data.model';

export const TRANSACTIONS_FEATURE_KEY = 'transactions';

export interface State extends EntityState<TransactionsEntity> {
  selectedId?: string | number; // which Transactions record has been selected
  balance: number;
  loaded: boolean; // has the Transactions list been loaded
  error?: string | null; // last known error (if any)
}

export interface TransactionsPartialState {
  readonly [TRANSACTIONS_FEATURE_KEY]: State;
}

export const transactionsAdapter: EntityAdapter<TransactionsEntity> = createEntityAdapter<
  TransactionsEntity
>();

export const initialState: State = transactionsAdapter.getInitialState({
  balance: 5824.76,
  loaded: false
});

const transactionsReducer = createReducer(
  initialState,
  on(TransactionsActions.loadTransactions, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(TransactionsActions.loadTransactionsSuccess, (state, { transactions }) =>
    transactionsAdapter.setAll(transactions, { ...state, loaded: true })
  ),
  on(TransactionsActions.loadTransactionsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TransactionsActions.makeTransactionSuccess, (state, { transaction }) =>
    transactionsAdapter.setOne(transaction, { 
      ...state, 
      balance: state.balance - Number(transaction.transaction.amountCurrency.amount) 
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return transactionsReducer(state, action);
}
