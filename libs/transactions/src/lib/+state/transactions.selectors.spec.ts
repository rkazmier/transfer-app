import {
  transactionsAdapter,
  initialState,
} from './transactions.reducer';
import * as TransactionsSelectors from './transactions.selectors';
import { createTransactionsEntity } from '../tests.util';

describe('Transactions Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTransactionsId = (it) => it['id'];

  let state;

  beforeEach(() => {
    state = {
      transactions: transactionsAdapter.setAll(
        [
          createTransactionsEntity('test-1','PRODUCT-AAA', 123),
          createTransactionsEntity('test-2','PRODUCT-BBB', 234),
          createTransactionsEntity('test-3','PRODUCT-CCC', 345),
        ],
        {
          ...initialState,
          selectedId: 'test-2',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Transactions Selectors', () => {
    it('getAllTransactions() should return the list of Transactions', () => {
      const results = TransactionsSelectors.getAllTransactions(state);
      const selId = getTransactionsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('test-2');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = TransactionsSelectors.getSelected(state);
      const selId = getTransactionsId(result);

      expect(selId).toBe('test-2');
    });

    it("getTransactionsLoaded() should return the current 'loaded' status", () => {
      const result = TransactionsSelectors.getTransactionsLoaded(state);

      expect(result).toBe(true);
    });

    it("getTransactionsError() should return the current 'error' state", () => {
      const result = TransactionsSelectors.getTransactionsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
