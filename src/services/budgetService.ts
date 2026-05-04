import type { Service, Client, Budget } from '../types/budget.types'

export function calculateTotal(services: Service[]): number {
    return services.reduce((sum, service) => {
        if (service.id === 'web') {
            return sum + 500 + ((service.pages ?? 1) + (service.langs ?? 1)) * 30
        }
        return sum + service.price
    }, 0)
}