import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as TransactionsActions from './transactions.actions';
import * as mock from '../data-mock/transactions.json';
import { TransactionsEntity } from './transactions.models';
import { map } from 'rxjs/operators';
import { createTransaction } from '../transactions.util';

@Injectable()
export class TransactionsEffects {
  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.loadTransactions),
      fetch({
        run: (action) => {
          return TransactionsActions.loadTransactionsSuccess({
            transactions: mock.data.map<TransactionsEntity>(
              (operation, id) => ({ ...operation, id })
            )
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return TransactionsActions.loadTransactionsFailure({ error });
        },
      })
    )
  );

  makeTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.makeTransaction),
        map(({order: {toAccount, amount}}) => {
          return TransactionsActions.makeTransactionSuccess({transaction: createTransaction(toAccount, amount)})
        }
      )
    )
  );

  constructor(private actions$: Actions) {}
}
