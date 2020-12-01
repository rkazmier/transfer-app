import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Inject } from '@angular/core';
import { TransactionsFacade } from '../../+state/transactions.facade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { makeTransaction } from '../../+state/transactions.actions';
import { TransactionDialogService, TRANSACTIONS_DIALOG_TOKEN } from '../../dependencies/transaction-dialog.dependency';
import { TransferOrderFormModel } from '../../data.model';


@Component({
  selector: 'nrwl-workspace-transactions-transfer',
  templateUrl: './transactions-transfer.component.html',
  styleUrls: ['./transactions-transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsTransferComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  transferForm = this.initForm(new TransferOrderFormModel());

  constructor(
    public facade: TransactionsFacade, 
    private fb: FormBuilder, 
    @Inject(TRANSACTIONS_DIALOG_TOKEN) private dialog: TransactionDialogService
  ) { }

  ngOnInit(): void {
    this.facade.balance$.pipe(
      takeUntil(this.destroy$), 
      map((balance) => ({
        fromAccount: `Free Checking(4692) — ${balance} EUR`, 
        toAccount: '', 
        amount: '',
        balance
      }))
    ).subscribe((data) => {
      this.transferForm.reset(data);
    });
  }

  ngOnDestroy(): void {
    this.transferForm.reset();
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(order: TransferOrderFormModel): FormGroup {
    return this.fb.group({
      fromAccount: [{value: order.fromAccount, disabled: true}], 
      toAccount: [order.toAccount, [Validators.required]], 
      amount: [order.amount, [Validators.required, Validators.pattern('^[0-9]*([.][0-9]{1,2})?$')]],
      balance: [order.balance] 
    });
  }

  onSubmit() {
    const {amount, toAccount, balance} = this.transferForm.value;
    if (balance - Number(amount) < -500) {
      this.dialog.notify('Transaction cannot be processed. Your max debt is -500 EUR');
    } else {
      this.dialog.confirm(`Do you confirm a transfer of ${amount} EUR to ${toAccount}?`)
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.facade.dispatch(makeTransaction({order: this.transferForm.value}));
        }
      });
    }
  }
}
