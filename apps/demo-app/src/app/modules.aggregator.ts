import { Provider } from "@angular/compiler/src/core";
import { TRANSACTIONS_DIALOG_TOKEN } from './lazy-modules.dependency';
import { DialogService } from '@nrwl-workspace/notifications';

export const EXTERNAL_LIBRARY_PROVIDERS: Provider[] = [
    {
      provide: TRANSACTIONS_DIALOG_TOKEN,
      useExisting: DialogService
    }
]