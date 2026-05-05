import { useState } from 'react'
import type { Service, Client } from '../types/budget.types'
import { useBudgets } from '../hooks/useBudgets'
import { buildBudget } from '../services/budgetService'
import ServiceList from '../components/ServiceList'
import ClientForm from '../components/ClientForm'
import BudgetList from '../components/BudgetList'

export default function HomePage() {
  const { budgets, addBudget, deleteBudget } = useBudgets()
  const [total, setTotal] = useState(0)
  const [selectedServices, setSelectedServices] = useState<Service[]>([])
  const [saved, setSaved] = useState(false)
  const [listKey, setListKey] = useState(0)

  function handleSubmit(client: Client) {
    const newBudget = buildBudget(client, selectedServices)
    addBudget(newBudget)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    setListKey(k => k + 1)
  }

  return (
    <>
      <header className="hero">
        <span className="hero__logo">Frontender.itacademy</span>
        <h1 className="hero__heading">Consigue la mejor calidad en servicios de desarrollo web</h1>
      </header>

      <main className="home-main">
        <ServiceList
          key={listKey}
          onTotalChange={setTotal}
          onServicesChange={setSelectedServices}
        />

        <ClientForm total={total} onSubmit={handleSubmit} />

        {saved && (
          <p className="success-toast" role="status">
            ¡Presupuesto guardado correctamente!
          </p>
        )}

        <section className="budgets-section">
          <h2 className="budgets-section__heading">Presupuestos en curso:</h2>
          <BudgetList budgets={budgets} onDelete={deleteBudget} />
        </section>
      </main>
    </>
  )
}
