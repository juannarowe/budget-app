import { Link, useParams } from 'react-router-dom'
import { useBudgets } from '../hooks/useBudgets'
import BudgetDetail from '../components/BudgetDetail'

export default function BudgetDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { budgets } = useBudgets()
  const budget = budgets.find(b => b.id === id)

  if (!budget) {
    return (
      <div className="not-found">
        <p>Presupuesto no encontrado.</p>
        <Link to="/">← Volver al inicio</Link>
      </div>
    )
  }

  return <BudgetDetail budget={budget} />
}
