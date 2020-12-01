export class OperationModel {
    categoryCode: string;
    dates: OperationDateModel;
    transaction: TransactionModel;
    merchant: MerchantModel;
}

export class OperationDateModel {
    valueDate: string | number;
}

export class TransactionModel {
    amountCurrency: AmountModel;
    type: string;
    creditDebitIndicator?: string;
}

export class MerchantModel {
    name: string;
    accountNumber: string;
}

export class AmountModel {
    amount: string | number;
    currencyCode: string;
}

export enum TransactionType {
    Online = 'Online Transfer',
    Card = 'Card Payment',
    Transaction = 'Transaction',
    Salaries = 'Salaries'
}

export enum CreditDebitIndicator {
    Debit = 'DBIT',
    Credit = 'CRDT'
}

export class TransferOrderModel {
    amount: string;
    toAccount: string;
    fromAccount: string;
}

export class TransferOrderFormModel extends TransferOrderModel {
    balance: number;
}

export class ViewSettingsModel {
    sortingOrder: SortingOrder;
    sortingKeyName: SortingKey;
}

export enum SortingOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

export enum SortingKey {
    DATE = 'DATE',
    BENEFICIARY = 'BENEFICIARY',
    AMOUNT = 'AMOUNT'
}
