import { useState } from 'react'
import type { Service, Client } from '../types/budget.types'
import { useBudgets } from '../hooks/useBudgets'
import { buildBudget } from '../services/budgetService'
import ServiceList from '../components/ServiceList'
import ClientForm from '../components/ClientForm'
import BudgetList from '../components/BudgetList'

export default function HomePage() {
  const { budgets, addBudget } = useBudgets()
  const [total, setTotal] = useState(0)
  const [selectedServices, setSelectedServices] = useState<Service[]>([])

  function handleSubmit(client: Client) {
    const newBudget = buildBudget(client, selectedServices)
    addBudget(newBudget)
  }

  return (
    <main>
      <ServiceList
        onTotalChange={setTotal}
        onServicesChange={setSelectedServices}
      />
      <ClientForm total={total} onSubmit={handleSubmit} />
      <BudgetList budgets={budgets} />
    </main>
  )
}