import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { loadTransactions } from '../../+state/transactions.actions';
import { TransactionsFacade } from '../../+state/transactions.facade';
import { TransactionsEntity } from '../../+state/transactions.models';
import { SortingKey, SortingOrder, ViewSettingsModel } from '../../data.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'nrwl-workspace-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsHistoryComponent implements OnInit, OnDestroy {

  public transactions$: Observable<TransactionsEntity[]>;
  public search = new FormControl('');
  public viewSettings$: Subject<ViewSettingsModel> = new BehaviorSubject({
    sortingOrder: SortingOrder.DESC,
    sortingKeyName: SortingKey.DATE
  });
  private search$: Subject<string> = new BehaviorSubject('');
  private destroy$: Subject<void> = new Subject();
  private currentViewSettings: ViewSettingsModel;
  
  constructor(public facade: TransactionsFacade) { }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((text) => { this.search$.next(text)});
    this.facade.dispatch(loadTransactions());

    this.viewSettings$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((settings) => {
      this.currentViewSettings = settings;
    });

    this.transactions$ = combineLatest([
      this.facade.allTransactions$, 
      this.search$,
      this.viewSettings$
    ]).pipe(
      map(([allTransactions, search, viewSettings]) => {
        return allTransactions
          .filter((t: TransactionsEntity) => this.searchFilter(t, search.toLowerCase()))
          .sort((a,b) => this.sortTransactions(a,b, viewSettings));
      })
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAmountClick(): void {
    this.changeSorting(SortingKey.AMOUNT);
  }

  onBeneficiaryClick(): void {
    this.changeSorting(SortingKey.BENEFICIARY);
  }

  onDateClick(): void {
    this.changeSorting(SortingKey.DATE);
  }

  private changeSorting(key: SortingKey) {
    this.viewSettings$.next({
      sortingOrder: this.currentViewSettings.sortingKeyName === key ? 
        this.getOpposite(this.currentViewSettings.sortingOrder) : this.currentViewSettings.sortingOrder,
      sortingKeyName: key
    });
  }

  private getOpposite(order: SortingOrder): SortingOrder {
    return SortingOrder.ASC === order ? SortingOrder.DESC : SortingOrder.ASC;
  } 

  private searchFilter(t: TransactionsEntity, text: string): boolean {
    if ( text ) {
      return t.transaction.amountCurrency.amount.toString().includes(text) 
      || t.transaction.amountCurrency.currencyCode.toLowerCase().includes(text) 
      || t.transaction.type.toLowerCase().includes(text) 
      || t.merchant.name.toLowerCase().includes(text)
      || new Date(t.dates.valueDate).toUTCString().toLowerCase().includes(text);
    } else {
      return true;
    }
  }

  private sortTransactions(a: TransactionsEntity, b: TransactionsEntity, settings: ViewSettingsModel): number {
    let aValue = 0, bValue = 0;
    switch(settings.sortingKeyName) {
      case SortingKey.AMOUNT: {
        aValue = Number(a.transaction.amountCurrency.amount);
        bValue = Number(b.transaction.amountCurrency.amount);
        break;
      }
      case SortingKey.BENEFICIARY: {
        return SortingOrder.ASC === settings.sortingOrder ? 
          a.merchant.name.localeCompare(b.merchant.name) : 
          b.merchant.name.localeCompare(a.merchant.name);
      }
      case SortingKey.DATE: {
        aValue = new Date(a.dates.valueDate).getTime();
        bValue = new Date(b.dates.valueDate).getTime();
        break;
      }
    }

    return SortingOrder.ASC === settings.sortingOrder ? aValue - bValue : bValue - aValue;
  }

}
