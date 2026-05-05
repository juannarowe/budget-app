import { Link } from 'react-router-dom'
import type { Budget } from '../types/budget.types'

interface BudgetCardProps {
  budget: Budget
}

export default function BudgetCard({ budget }: BudgetCardProps) {
  const { client, services, total, id } = budget

  return (
    <Link to={`/budget/${id}`} className="budget-card">
      <span>{client.name}</span>
      <span>{client.email}</span>
      <span>{client.phone}</span>
      <ul>
        {services.map(service => (
          <li key={service.id}>{service.name}</li>
        ))}
      </ul>
      <span>{total} €</span>
    </Link>
  )
}