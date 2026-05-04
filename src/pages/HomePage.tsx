import { useState } from 'react'
import ClientForm from '../components/ClientForm'
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
            <ClientForm
                total={total}
                onSubmit={(client) => console.log(client)}
            />    
            <p>Total selecionado: {total} €</p>
        </main>
    )
}