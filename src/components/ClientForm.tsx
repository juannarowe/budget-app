import { useState } from 'react'
import type { Client } from '../types/budget.types'
import { validateClient } from '../services/validateClient'
import type { FormErrors } from '../services/validateClient'

interface ClientFormProps {
  total: number
  onSubmit(client: Client): void
}

interface FormState {
  name: string
  email: string
  phone: string
}

const EMPTY: FormState = { name: '', email: '', phone: '' }

export default function ClientForm({ total, onSubmit }: ClientFormProps) {
  const [fields, setFields] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const updated = { ...fields, [name]: value }
    setFields(updated)
    if (submitted) setErrors(validateClient(updated))
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    setSubmitted(true)
    const errs = validateClient(fields)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    onSubmit({ name: fields.name, email: fields.email, phone: fields.phone })
    setFields(EMPTY)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <form className="client-form" onSubmit={handleSubmit} noValidate>
      <h3 className="client-form__heading">Solicitar presupuesto</h3>

      <div className="client-form__row">
        <div className="form-field">
          <label className="sr-only" htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nombre"
            value={fields.name}
            onChange={handleChange}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <span id="name-error" className="form-error">{errors.name}</span>}
        </div>

        <div className="form-field">
          <label className="sr-only" htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Teléfono"
            value={fields.phone}
            onChange={handleChange}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && <span id="phone-error" className="form-error">{errors.phone}</span>}
        </div>

        <div className="form-field">
          <label className="sr-only" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={fields.email}
            onChange={handleChange}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <span id="email-error" className="form-error">{errors.email}</span>}
        </div>

        <button type="submit" className="btn-submit" disabled={total === 0}>
          Solicitar presupuesto →
        </button>
      </div>
    </form>
  )
}
