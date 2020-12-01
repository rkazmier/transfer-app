import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromTransactions from './transactions.reducer';
import * as TransactionsSelectors from './transactions.selectors';
import { createTransaction } from './../transactions.util';
import { makeTransaction } from './transactions.actions';

@Injectable()
export class TransactionsFacade {
  balance$ = this.store.pipe(
    select(TransactionsSelectors.getTransactionsBalance)
  );
  loaded$ = this.store.pipe(
    select(TransactionsSelectors.getTransactionsLoaded)
  );
  allTransactions$ = this.store.pipe(
    select(TransactionsSelectors.getAllTransactions)
  );
  selectedTransactions$ = this.store.pipe(
    select(TransactionsSelectors.getSelected)
  );

  constructor(
    private store: Store<fromTransactions.TransactionsPartialState>
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

}
