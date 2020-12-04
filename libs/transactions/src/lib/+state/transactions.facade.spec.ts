import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { TransactionsEffects } from './transactions.effects';
import { TransactionsFacade } from './transactions.facade';

import * as TransactionsActions from './transactions.actions';
import {
  TRANSACTIONS_FEATURE_KEY,
  State,
  reducer,
} from './transactions.reducer';
import { createTransactionsEntity } from '../tests.util';

interface TestSchema {
  transactions: State;
}

describe('TransactionsFacade', () => {
  let facade: TransactionsFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TRANSACTIONS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([TransactionsEffects]),
        ],
        providers: [TransactionsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(TransactionsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allTransactions$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(TransactionsActions.loadTransactions());

        list = await readFirst(facade.allTransactions$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(11);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadTransactionsSuccess` to manually update list
     */
    it('allTransactions$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allTransactions$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          TransactionsActions.loadTransactionsSuccess({
            transactions: [
              createTransactionsEntity('test-1', 'AAA', 45),
              createTransactionsEntity('test-2', 'BBB', 678),
            ],
          })
        );

        list = await readFirst(facade.allTransactions$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
