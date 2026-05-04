import { useState } from 'react'
import type { Service } from '../types/budget.types'
import ServiceList from '../components/ServiceList'

export default function HomePage() {
    const [total, setTotal] = useState(0)
    const [selectedServices, setSelectedServices] = useState<Service[]>([])

    return (
        <main>
            <ServiceList
                onTotalChange={setTotal}
                onServicesChange={setSelectedServices}
            />
            <p>Total selecionado: {total} €</p>
        </main>
    )
}