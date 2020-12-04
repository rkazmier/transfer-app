import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTransactions from './+state/transactions.reducer';
import { TransactionsEffects } from './+state/transactions.effects';
import { TransactionsFacade } from './+state/transactions.facade';
import { TransactionsRoutingModule } from './transactions.routing.module';
import { TransactionsTransferComponent } from './components/transactions-transfer/transactions-transfer.component';
import { TransactionsHistoryComponent } from './components/transactions-history/transactions-history.component';
import { TransactionsPageComponent } from './components/transactions-page/transactions-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromTransactions.TRANSACTIONS_FEATURE_KEY,
      fromTransactions.reducer
    ),
    EffectsModule.forFeature([TransactionsEffects]),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    TransactionsPageComponent,
    TransactionsTransferComponent,
    TransactionsHistoryComponent
  ],
  providers: [TransactionsFacade],
})
export class TransactionsModule {}
