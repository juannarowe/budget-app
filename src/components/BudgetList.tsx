import type { Budget } from '../types/budget.types'
import BudgetCard from './BudgetCard'

interface BudgetListProps {
  budgets: Budget[]
}

export default function BudgetList({ budgets }: BudgetListProps) {
  if (budgets.length === 0) {
    return <p>Todavía no hay presupuestos.</p>
  }

  return (
    <div>
      {budgets.map(budget => (
        <BudgetCard key={budget.id} budget={budget} />
      ))}
    </div>
  )
}