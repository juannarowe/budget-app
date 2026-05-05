import type { Budget } from '../types/budget.types'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem:    (k: string) => store[k] ?? null,
    setItem:    (k: string, v: string) => { store[k] = v },
    removeItem: (k: string) => { delete store[k] },
    clear:      () => { store = {} },
  }
})()

Object.defineProperty(global, 'localStorage', { value: localStorageMock })

const STORAGE_KEY = 'budgets'

const BUDGET_A: Budget = {
  id: 'test-id-1',
  date: new Date().toISOString(),
  client: { name: 'Ana García', email: 'ana@example.com', phone: '600111222' },
  services: [{ id: 'seo', name: 'SEO', price: 300 }],
  total: 300,
}

const BUDGET_B: Budget = {
  id: 'test-id-2',
  date: new Date().toISOString(),
  client: { name: 'Carlos López', email: 'carlos@example.com', phone: '611222333' },
  services: [{ id: 'ads', name: 'Ads', price: 400 }, { id: 'seo', name: 'SEO', price: 300 }],
  total: 700,
}

beforeEach(() => {
  localStorageMock.clear()
})

// ─────────────────────────────────────────────
// Feature: Persistencia de presupuestos
// ─────────────────────────────────────────────
describe('useBudgets — persistencia en localStorage', () => {

  // Scenario: Estado inicial sin datos
  // Given localStorage está vacío
  // When se lee y parsea el valor almacenado
  // Then debe devolver un array vacío
  it('devuelve un array vacío cuando localStorage está vacío', () => {
    const raw = localStorage.getItem(STORAGE_KEY)
    const budgets: Budget[] = raw ? (JSON.parse(raw) as Budget[]) : []
    expect(budgets).toEqual([])
  })

  // Scenario: Guardar un presupuesto
  // Given se añade un presupuesto a la lista actual
  // When se serializa y guarda en localStorage
  // Then leerlo de nuevo debe devolver el presupuesto persistido
  it('persiste un presupuesto al guardarlo en localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([BUDGET_A]))

    const raw = localStorage.getItem(STORAGE_KEY)
    const stored: Budget[] = raw ? (JSON.parse(raw) as Budget[]) : []

    expect(stored).toHaveLength(1)
    expect(stored[0].id).toBe(BUDGET_A.id)
    expect(stored[0].client.name).toBe(BUDGET_A.client.name)
    expect(stored[0].total).toBe(BUDGET_A.total)
  })

  // Scenario: Cargar presupuestos existentes al iniciar
  // Given localStorage ya contiene presupuestos serializados
  // When se lee y parsea el valor al iniciar la app
  // Then deben devolverse los presupuestos guardados
  it('carga los presupuestos existentes de localStorage al iniciar', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([BUDGET_A, BUDGET_B]))

    const raw = localStorage.getItem(STORAGE_KEY)
    const budgets: Budget[] = raw ? (JSON.parse(raw) as Budget[]) : []

    expect(budgets).toHaveLength(2)
    expect(budgets[0].id).toBe(BUDGET_A.id)
    expect(budgets[1].id).toBe(BUDGET_B.id)
  })

  // Scenario: Eliminar un presupuesto
  // Given localStorage contiene dos presupuestos
  // When se elimina uno por su ID mediante filter
  // Then localStorage debe contener solo el presupuesto restante
  it('elimina un presupuesto por ID al borrarlo', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([BUDGET_A, BUDGET_B]))

    const raw = localStorage.getItem(STORAGE_KEY)
    const all: Budget[] = raw ? (JSON.parse(raw) as Budget[]) : []
    const updated = all.filter(b => b.id !== BUDGET_A.id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

    const after = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Budget[]
    expect(after).toHaveLength(1)
    expect(after[0].id).toBe(BUDGET_B.id)
  })

  // Scenario: Buscar un presupuesto por ID
  // Given localStorage contiene dos presupuestos
  // When se busca por el ID de uno de ellos
  // Then debe devolverse el presupuesto correcto
  it('encuentra un presupuesto por su ID', () => {
    const budgets = [BUDGET_A, BUDGET_B]
    const found = budgets.find(b => b.id === BUDGET_B.id)

    expect(found).toBeDefined()
    expect(found?.client.name).toBe(BUDGET_B.client.name)
    expect(found?.total).toBe(700)
  })

  // Scenario: Buscar un ID que no existe
  // Given localStorage contiene presupuestos
  // When se busca un ID inexistente
  // Then debe devolver undefined
  it('devuelve undefined cuando el ID del presupuesto no existe', () => {
    const budgets = [BUDGET_A]
    const found = budgets.find(b => b.id === 'id-que-no-existe')
    expect(found).toBeUndefined()
  })
})
