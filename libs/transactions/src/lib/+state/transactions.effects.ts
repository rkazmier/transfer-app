import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, Effect } from '@ngrx/effects';
import * as TransactionsActions from './transactions.actions';
import { TransactionsEntity } from './transactions.models';
import { catchError, map, switchMap } from 'rxjs/operators';
import { createTransaction } from '../transactions.util';
import { TransactionsService } from '../services/transactions.service';
import { OperationModel } from '../data.model';
import { of } from 'rxjs';

@Injectable()
export class TransactionsEffects {

  @Effect() loadTransactions$ = this.actions$.pipe(
    ofType(TransactionsActions.loadTransactions),
    switchMap(() =>
      this.service.getTransactions<{data: OperationModel[]}>().pipe(
        map(res => {
          return TransactionsActions.loadTransactionsSuccess({ 
            transactions: res.data.map<TransactionsEntity>(
              (operation, id) => ({ ...operation, id })
            )
          });
        }),
        catchError(({ message }: Error) =>
          of(TransactionsActions.loadTransactionsFailure({ error: message }))
        )
      )
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

  constructor(private actions$: Actions, private service: TransactionsService) {}
}
