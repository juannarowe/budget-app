import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Budget } from '../types/budget.types'

interface BudgetCardProps {
  budget: Budget
  onDelete(id: string): void
}

export default function BudgetCard({ budget, onDelete }: BudgetCardProps) {
  const { client, services, total, id } = budget
  const [pendingDelete, setPendingDelete] = useState(false)

  function handleDeleteClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setPendingDelete(true)
  }

  function handleCancel(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setPendingDelete(false)
  }

  function handleConfirm(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    onDelete(id)
  }

  function handleOverlayClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setPendingDelete(false)
  }

  useEffect(() => {
    if (!pendingDelete) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setPendingDelete(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [pendingDelete])

  return (
    <>
      <Link to={`/budget/${id}`} className="budget-card">
        <div className="budget-card__body">
          <div className="budget-card__client">
            <span className="budget-card__name">{client.name}</span>
            <span className="budget-card__contact">{client.email}</span>
            <span className="budget-card__contact">{client.phone}</span>
          </div>

          <div className="budget-card__services-col">
            <span className="budget-card__services-label">Servicios contratados:</span>
            <ul className="budget-card__services">
              {services.map(s => (
                <li key={s.id}>{s.name}</li>
              ))}
            </ul>
          </div>

          <div className="budget-card__total-col">
            <span className="budget-card__total-label">Total:</span>
            <span className="budget-card__total">{total} €</span>
          </div>

          <button
            type="button"
            className="btn-delete"
            onClick={handleDeleteClick}
            aria-label={`Eliminar presupuesto de ${client.name}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      </Link>

      {pendingDelete && (
        <div
          className="modal-overlay"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </div>
            <h2 className="modal__title" id="modal-title">¿Eliminar presupuesto?</h2>
            <p className="modal__message">
              Esta acción no se puede deshacer. Se eliminará permanentemente el presupuesto de{' '}
              <strong>{client.name}</strong>.
            </p>
            <div className="modal__actions">
              <button type="button" className="btn-modal-cancel" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="button" className="btn-modal-delete" onClick={handleConfirm}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
