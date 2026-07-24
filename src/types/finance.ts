export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  category: string;
  projectId?: number;
}

export interface Revenue {
  month: string;
  amount: number;
  projected: number;
}

export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  pendingPayments: number;
  monthlyRevenue: Revenue[];
}
