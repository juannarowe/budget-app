import { useState } from 'react'
import type { Service } from '../types/budget.types'
import { calculateTotal } from '../services/budgetService'
import ServiceCard from './ServiceCard'

const CATALOG: Service[] = [
    { id: 'seo', name: 'SEO', price: 300 },
    { id: 'ads', name: 'Ads', price: 400 },
    { id: 'web', name: 'Web', price: 500 },
]

const DESCRIPTIONS: Record<Service['id'], string> = {
    seo: 'Posicionamiento web en buscadores',
    ads: 'Campañas de publicidad digital',
    web: 'Desarrollo de una página web completa',
}

interface ServiceListProps {
    onTotalChange(total: number): void
    onServicesChange(services: Service[]): void
}

export default function ServiceList({ onTotalChange, onServicesChange }: ServiceListProps) {
    const [selected, setSelected] = useState<string[]>([])
    const [pages, setPages] = useState(1)
    const [langs, setLangs] = useState(1)

    function handleToggle(id: string) {
        const next = selected.includes(id)
        ? selected.filter(serviceId => serviceId !== id)
        : [...selected, id]

        setSelected(next)

        const selectedServices = buildSelectedServices(next, pages, langs)
        onTotalChange(calculateTotal(selectedServices))
        onServicesChange(selectedServices)
    }

    function handleWebChange(field: 'pages' | 'langs', value: number) {
        const nextPages = field === 'pages' ? value : pages
        const nextLangs = field === 'langs' ? value : langs

        if (field === 'pages') setPages(value)
        if (field === 'langs') setLangs(value)

        const selectedServices = buildSelectedServices(selected, nextPages, nextLangs)
        onTotalChange(calculateTotal(selectedServices))
        onServicesChange(selectedServices)
    }

    function buildSelectedServices(ids: string[], pages: number, langs: number): Service[] {
        return CATALOG
            .filter(service => ids.includes(service.id))
            .map(service => service.id === 'web' ? { ...service, pages, langs } : service)
    }

    const selectedServices = buildSelectedServices(selected, pages, langs)
    const total = calculateTotal(selectedServices)

    return (
        <div>
            {CATALOG.map(service => (
                <ServiceCard
                    key={service.id}
                    service={service}
                    description={DESCRIPTIONS[service.id]}
                    selected={selected.includes(service.id)}
                    pages={pages}
                    langs={langs}
                    onToggle={handleToggle}
                    onWebChange={handleWebChange}
                />
            ))}
            <p>Total: {total} €</p>
        </div>
    )
}