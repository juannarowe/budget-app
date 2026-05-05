import { validateClient } from '../services/validateClient'
import type { FormFields } from '../services/validateClient'

const VALID: FormFields = { name: 'Ana García', email: 'ana@example.com', phone: '600111222' }

// ─────────────────────────────────────────────
// Feature: Validación del formulario de cliente
// ─────────────────────────────────────────────
describe('validateClient', () => {

  // Scenario: Formulario válido sin errores
  // Given todos los campos están correctamente rellenados
  // When se valida el formulario
  // Then no debe haber errores
  it('no devuelve errores cuando todos los campos son válidos', () => {
    const errors = validateClient(VALID)
    expect(Object.keys(errors)).toHaveLength(0)
  })

  // Scenario: Nombre vacío
  // Given el campo nombre está vacío
  // When se valida el formulario
  // Then debe aparecer el error de nombre obligatorio
  it('devuelve error de nombre cuando el nombre está vacío', () => {
    const errors = validateClient({ ...VALID, name: '' })
    expect(errors.name).toBe('El nombre es obligatorio')
    expect(errors.email).toBeUndefined()
    expect(errors.phone).toBeUndefined()
  })

  // Scenario: Nombre con solo espacios
  // Given el campo nombre contiene solo espacios en blanco
  // When se valida el formulario
  // Then debe tratarse como vacío y mostrar el error
  it('trata el nombre con solo espacios como vacío', () => {
    const errors = validateClient({ ...VALID, name: '   ' })
    expect(errors.name).toBe('El nombre es obligatorio')
  })

  // Scenario: Email vacío
  // Given el campo email está vacío
  // When se valida el formulario
  // Then debe aparecer el error de email obligatorio
  it('devuelve error de email cuando el email está vacío', () => {
    const errors = validateClient({ ...VALID, email: '' })
    expect(errors.email).toBe('El email es obligatorio')
  })

  // Scenario: Email sin arroba
  // Given el campo email tiene valor pero sin el símbolo @
  // When se valida el formulario
  // Then debe aparecer el error de email no válido
  it('devuelve error de email inválido cuando falta el @', () => {
    const errors = validateClient({ ...VALID, email: 'anaexample.com' })
    expect(errors.email).toBe('El email no es válido')
  })

  // Scenario: Teléfono vacío
  // Given el campo teléfono está vacío
  // When se valida el formulario
  // Then debe aparecer el error de teléfono obligatorio
  it('devuelve error de teléfono cuando el teléfono está vacío', () => {
    const errors = validateClient({ ...VALID, phone: '' })
    expect(errors.phone).toBe('El teléfono es obligatorio')
  })

  // Scenario: Todos los campos vacíos
  // Given todos los campos están vacíos
  // When se valida el formulario
  // Then deben aparecer errores en nombre, email y teléfono
  it('devuelve todos los errores cuando todos los campos están vacíos', () => {
    const errors = validateClient({ name: '', email: '', phone: '' })
    expect(errors.name).toBeDefined()
    expect(errors.email).toBeDefined()
    expect(errors.phone).toBeDefined()
  })
})
