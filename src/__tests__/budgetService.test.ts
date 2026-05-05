import { calculateTotal, buildBudget } from '../services/budgetService'
import type { Client, Service } from '../types/budget.types'

const SEO: Service  = { id: 'seo', name: 'SEO', price: 300 }
const ADS: Service  = { id: 'ads', name: 'Ads', price: 400 }
const WEB_1_1: Service = { id: 'web', name: 'Web', price: 500, pages: 1, langs: 1 }
const WEB_3_2: Service = { id: 'web', name: 'Web', price: 500, pages: 3, langs: 2 }

const CLIENT: Client = { name: 'Ana García', email: 'ana@example.com', phone: '600111222' }

// ─────────────────────────────────────────────
// Feature: Cálculo del precio total
// ─────────────────────────────────────────────
describe('calculateTotal', () => {

  // Scenario: No hay servicios seleccionados
  // Given no se ha seleccionado ningún servicio
  // When se calcula el total
  // Then el resultado debe ser 0
  it('devuelve 0 cuando no hay servicios seleccionados', () => {
    expect(calculateTotal([])).toBe(0)
  })

  // Scenario: Solo servicio SEO seleccionado
  // Given el usuario selecciona únicamente SEO
  // When se calcula el total
  // Then el resultado debe ser 300
  it('devuelve 300 para SEO únicamente', () => {
    expect(calculateTotal([SEO])).toBe(300)
  })

  // Scenario: Solo servicio Ads seleccionado
  // Given el usuario selecciona únicamente Ads
  // When se calcula el total
  // Then el resultado debe ser 400
  it('devuelve 400 para Ads únicamente', () => {
    expect(calculateTotal([ADS])).toBe(400)
  })

  // Scenario: SEO y Ads seleccionados
  // Given el usuario selecciona SEO y Ads
  // When se calcula el total
  // Then el resultado debe ser 700 (300 + 400)
  it('devuelve 700 para SEO + Ads', () => {
    expect(calculateTotal([SEO, ADS])).toBe(700)
  })

  // Scenario: Web con 1 página y 1 idioma
  // Given el usuario selecciona Web con 1 página y 1 idioma
  // When se calcula el total
  // Then el resultado debe ser 560 (500 + (1+1)*30)
  it('devuelve 560 para Web con 1 página y 1 idioma', () => {
    expect(calculateTotal([WEB_1_1])).toBe(560)
  })

  // Scenario: Web con 3 páginas y 2 idiomas
  // Given el usuario selecciona Web con 3 páginas y 2 idiomas
  // When se calcula el total
  // Then el resultado debe ser 650 (500 + (3+2)*30)
  it('devuelve 650 para Web con 3 páginas y 2 idiomas', () => {
    expect(calculateTotal([WEB_3_2])).toBe(650)
  })

  // Scenario: Web sin pages ni langs especificados
  // Given el servicio Web no tiene pages ni langs definidos
  // When se calcula el total
  // Then se usan los valores por defecto (1 página, 1 idioma) → 560
  it('usa 1 página y 1 idioma por defecto cuando pages/langs no están definidos', () => {
    const webDefault: Service = { id: 'web', name: 'Web', price: 500 }
    expect(calculateTotal([webDefault])).toBe(560)
  })

  // Scenario: Los tres servicios seleccionados
  // Given el usuario selecciona SEO, Ads y Web (1p, 1l)
  // When se calcula el total
  // Then el resultado debe ser 1260 (300 + 400 + 560)
  it('devuelve 1260 para SEO + Ads + Web (1p, 1l)', () => {
    expect(calculateTotal([SEO, ADS, WEB_1_1])).toBe(1260)
  })
})

// ─────────────────────────────────────────────
// Feature: Creación de un presupuesto
// ─────────────────────────────────────────────
describe('buildBudget', () => {

  // Scenario: Crear un presupuesto válido
  // Given un cliente y una lista de servicios
  // When se llama a buildBudget
  // Then el objeto devuelto tiene id, date, client, services y total correctos
  it('devuelve un Budget con la estructura y valores correctos', () => {
    const services = [SEO, ADS]
    const budget = buildBudget(CLIENT, services)

    expect(typeof budget.id).toBe('string')
    expect(budget.id.length).toBeGreaterThan(0)
    expect(new Date(budget.date).toISOString()).toBe(budget.date)
    expect(budget.client).toEqual(CLIENT)
    expect(budget.services).toEqual(services)
    expect(budget.total).toBe(calculateTotal(services))
  })

  // Scenario: El total del presupuesto coincide con calculateTotal
  // Given un cliente y el servicio Web con 3 páginas y 2 idiomas
  // When se llama a buildBudget
  // Then el total del presupuesto debe ser 650
  it('calcula el total correctamente para Web con páginas e idiomas', () => {
    const budget = buildBudget(CLIENT, [WEB_3_2])
    expect(budget.total).toBe(650)
  })

  // Scenario: Dos presupuestos generados tienen IDs únicos
  // Given se crean dos presupuestos distintos
  // When se comparan sus IDs
  // Then los IDs deben ser diferentes
  it('genera IDs únicos para cada presupuesto', () => {
    const b1 = buildBudget(CLIENT, [SEO])
    const b2 = buildBudget(CLIENT, [ADS])
    expect(b1.id).not.toBe(b2.id)
  })
})
