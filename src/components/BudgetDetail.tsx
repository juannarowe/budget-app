import { Link } from 'react-router-dom'
import type { Budget } from '../types/budget.types'

interface BudgetDetailProps {
  budget: Budget
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

export default function BudgetDetail({ budget }: BudgetDetailProps) {
  const { client, services, total, date } = budget

  return (
    <div>
      <Link to="/">← Volver</Link>
      <span>{formatDate(date)}</span>

      <h1>{client.name}</h1>
      <p>{client.email}</p>
      <p>{client.phone}</p>

      <h2>Servicios contratados</h2>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            {service.name}
            {service.id === 'web' && (
              <span> — {service.pages} páginas, {service.langs} idiomas</span>
            )}
          </li>
        ))}
      </ul>

      <h2>Total</h2>
      <p>{total} €</p>
    </div>
  )
}