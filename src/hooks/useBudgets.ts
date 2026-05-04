import { useState } from 'react'
import type { Budget } from '../types/budget.types'

const STORAGE_KEY = 'budgets'

function loadBudgets(): Budget[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Budget[]) : []
  } catch {
    return []
  }
}

function saveBudgets(budgets: Budget[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets))
}

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>(loadBudgets)

  function addBudget(budget: Budget): void {
    const updated = [...budgets, budget]
    saveBudgets(updated)
    setBudgets(updated)
  }

  function getBudgetById(id: string): Budget | undefined {
    return budgets.find(b => b.id === id)
  }

  return { budgets, addBudget, getBudgetById }
}