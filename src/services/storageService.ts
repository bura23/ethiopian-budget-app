import { Transaction, Category } from '../types/budget'

const STORAGE_KEYS = {
  TRANSACTIONS: 'etb_transactions',
  CATEGORIES: 'etb_categories',
}

export const defaultCategories: Category[] = [
  { id: 'groceries', name: 'Groceries', color: 'green.500', budget: 5000 },
  { id: 'transport', name: 'Transport', color: 'blue.500', budget: 3000 },
  { id: 'utilities', name: 'Utilities', color: 'purple.500', budget: 2000 },
  { id: 'entertainment', name: 'Entertainment', color: 'pink.500', budget: 1500 },
  { id: 'salary', name: 'Salary', color: 'teal.500', budget: 25000 },
]

export const saveTransactions = (transactions: Transaction[]): void => {
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions))
}

export const getTransactions = (): Transaction[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)
  if (!stored) return []
  return JSON.parse(stored).map((t: any) => ({
    ...t,
    date: new Date(t.date)
  }))
}

export const saveCategories = (categories: Category[]): void => {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories))
}

export const getCategories = (): Category[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES)
  if (!stored) {
    saveCategories(defaultCategories)
    return defaultCategories
  }
  return JSON.parse(stored)
}

export const deleteTransaction = (id: string): void => {
  const transactions = getTransactions()
  saveTransactions(transactions.filter(t => t.id !== id))
}

export const updateTransaction = (updatedTransaction: Transaction): void => {
  const transactions = getTransactions()
  saveTransactions(transactions.map(t => 
    t.id === updatedTransaction.id ? updatedTransaction : t
  ))
}

export const addCategory = (category: Category): void => {
  const categories = getCategories()
  saveCategories([...categories, category])
}

export const updateCategory = (updatedCategory: Category): void => {
  const categories = getCategories()
  saveCategories(categories.map(c => 
    c.id === updatedCategory.id ? updatedCategory : c
  ))
}

export const deleteCategory = (id: string): void => {
  const categories = getCategories()
  saveCategories(categories.filter(c => c.id !== id))
} 