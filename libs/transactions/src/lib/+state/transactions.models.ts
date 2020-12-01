import { OperationModel } from '../data.model';

/**
 * Interface for the 'Transactions' data
 */
export interface TransactionsEntity extends OperationModel {
  id: string | number; // Primary ID
}
