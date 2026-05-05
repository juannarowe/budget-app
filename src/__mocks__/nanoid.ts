let _counter = 0

export function nanoid(): string {
  return `mock-id-${++_counter}`
}
