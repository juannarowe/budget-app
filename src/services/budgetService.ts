import type { Service, Client, Budget } from '../types/budget.types'
import { nanoid } from 'nanoid'

export function calculateTotal(services: Service[]): number {
    return services.reduce((sum, service) => {
        if (service.id === 'web') {
            return sum + 500 + ((service.pages ?? 1) + (service.langs ?? 1)) * 30
        }
        return sum + service.price
    }, 0)
}

export function buildBudget(client: Client, services: Service[]): Budget {
    return {
        id: nanoid(),
        date: new Date().toISOString(),
        client,
        services,
        total: calculateTotal(services),
    }
}

/*
new Date().toISOString() — guarda a data em formato ISO (2026-05-04T10:30:00.000Z).
É universal, fácil de ordenar e de converter para qualquer formato depois.
*/

