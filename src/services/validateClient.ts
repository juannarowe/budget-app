export interface FormErrors {
  name?: string
  email?: string
  phone?: string
}

export interface FormFields {
  name: string
  email: string
  phone: string
}

export function validateClient(fields: FormFields): FormErrors {
  const errors: FormErrors = {}
  if (!fields.name.trim()) errors.name = 'El nombre es obligatorio'
  if (!fields.email.trim()) errors.email = 'El email es obligatorio'
  else if (!fields.email.includes('@')) errors.email = 'El email no es válido'
  if (!fields.phone.trim()) errors.phone = 'El teléfono es obligatorio'
  return errors
}
