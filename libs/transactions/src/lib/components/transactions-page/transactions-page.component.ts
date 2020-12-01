
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nrwl-workspace-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
