import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'transactions',
    loadChildren: () => import('@nrwl-workspace/transactions').then(m => m.TransactionsModule)
  },
  {
    path: '**',
    redirectTo: '/transactions'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
