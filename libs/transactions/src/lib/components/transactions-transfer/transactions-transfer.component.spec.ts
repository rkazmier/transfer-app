import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsTransferComponent } from './transactions-transfer.component';

describe('TransactionsTransferComponent', () => {
  let component: TransactionsTransferComponent;
  let fixture: ComponentFixture<TransactionsTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
