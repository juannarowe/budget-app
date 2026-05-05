import { useState } from 'react'
import type { Budget } from '../types/budget.types'
import BudgetCard from './BudgetCard'

type SortField = 'date' | 'total' | 'name'
type SortDir = 'asc' | 'desc'

interface BudgetListProps {
  budgets: Budget[]
  onDelete(id: string): void
}

export default function BudgetList({ budgets, onDelete }: BudgetListProps) {
  const [query, setQuery] = useState('')
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const filtered = budgets.filter(b =>
    b.client.name.toLowerCase().includes(query.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0
    let cmp = 0
    if (sortField === 'date') cmp = a.date.localeCompare(b.date)
    else if (sortField === 'total') cmp = a.total - b.total
    else if (sortField === 'name') cmp = a.client.name.localeCompare(b.client.name)
    return sortDir === 'asc' ? cmp : -cmp
  })

  function sortLabel(field: SortField, label: string) {
    if (sortField !== field) return label
    return `${label} ${sortDir === 'asc' ? '↑' : '↓'}`
  }

  return (
    <div className="budget-list">
      <div className="budget-list__controls">
        <input
          className="budget-list__search"
          type="search"
          placeholder="Buscar por nombre..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="budget-list__sort">
          <button
            type="button"
            className={`sort-btn${sortField === 'date' ? ' sort-btn--active' : ''}`}
            onClick={() => handleSort('date')}
          >
            {sortLabel('date', 'Fecha')}
          </button>
          <button
            type="button"
            className={`sort-btn${sortField === 'total' ? ' sort-btn--active' : ''}`}
            onClick={() => handleSort('total')}
          >
            {sortLabel('total', 'Importe')}
          </button>
          <button
            type="button"
            className={`sort-btn${sortField === 'name' ? ' sort-btn--active' : ''}`}
            onClick={() => handleSort('name')}
          >
            {sortLabel('name', 'Nombre')}
          </button>
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="budget-list__empty">Todavía no hay presupuestos.</p>
      ) : (
        <div className="budget-list__cards">
          {sorted.map(b => (
            <BudgetCard key={b.id} budget={b} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
