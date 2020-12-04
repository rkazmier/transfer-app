import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  protocol = window.location.protocol;
  host = window.location.hostname;
  port = ':8080'; // TODO: move to configuration

  constructor(private httpClient: HttpClient) {}

  getTransactions<T>(): Observable<T> {
    return this.httpClient.get<T>(
      `${this.protocol}//${this.host}${this.port}/transactions.json`
    );
  }
}
