import * as TransactionsActions from './transactions.actions';
import { State, initialState, reducer } from './transactions.reducer';
import { createTransactionsEntity } from '../tests.util';

describe('Transactions Reducer', () => {

  beforeEach(() => {});

  describe('valid Transactions actions', () => {
    it('loadTransactionsSuccess should return set the list of known Transactions', () => {
      const transactions = [
        createTransactionsEntity('test-1', 'PRODUCT-AAA', 12),
        createTransactionsEntity('test-2', 'PRODUCT-zzz', 34),
      ];
      const action = TransactionsActions.loadTransactionsSuccess({
        transactions,
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
