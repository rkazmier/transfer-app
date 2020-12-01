import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  confirm(question: string): Observable<boolean> {
    return of(confirm(question));
  }

  notify(message: string): void {
    alert(message);
  }
}
