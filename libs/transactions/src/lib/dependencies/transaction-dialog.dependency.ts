import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const TRANSACTIONS_DIALOG_TOKEN: InjectionToken<TransactionDialogService> = new InjectionToken<
TransactionDialogService
>('TRANSACTIONS_DIALOG_TOKEN');

export abstract class TransactionDialogService {
  confirm: (question: string) => Observable<boolean>;
  notify: (message: string) => void;
}
