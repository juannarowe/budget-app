import { useParams, Link } from 'react-router-dom'
import { useBudgets } from '../hooks/useBudgets'

export default function BudgetDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { getBudgetById } = useBudgets()
  const budget = getBudgetById(id ?? '')

  if (!budget) {
    return (
      <div>
        <p>Presupuesto no encontrado.</p>
        <Link to="/">← Volver</Link>
      </div>
    )
  }

  return (
    <div>
      <p>{budget.client.name}</p>
      <p>{budget.client.email}</p>
      <p>{budget.client.phone}</p>
      <ul>
        {budget.services.map(service => (
          <li key={service.id}>{service.name}</li>
        ))}
      </ul>
      <p>Total: {budget.total} €</p>
    </div>
  )
}