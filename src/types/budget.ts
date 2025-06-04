export type TransactionType = 'INCOME' | 'EXPENSE';

export type Category = {
  id: string;
  name: string;
  color: string;
  budget: number;
};

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  description: string;
  date: Date;
};

export type Budget = {
  id: string;
  month: number;
  year: number;
  totalBudget: number;
  categories: Category[];
};

export type MonthlyReport = {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  categories: {
    categoryId: string;
    spent: number;
    budget: number;
  }[];
}; 