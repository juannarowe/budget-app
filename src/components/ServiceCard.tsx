import type { Service } from '../types/budget.types'

interface ServiceCardProps {
    service: Service
    description: string
    selected: boolean
    pages: number
    langs: number
    onToggle(id: string): void
    onWebChange(field: 'pagges' | 'langs', value: number): void
}

export default function ServiceCard({
    service,
    description,
    selected,
    pages,
    langs,
    onToggle,
    onWebChange,
}: ServiceCardProps) {
    return (
        <div className={`service-card ${selected ? 'service-card--selected' : ''}`}>
            <div>
                <p>{service.name}</p>
                <p>{description}</p>
                <p>{service.price} €</p>
            </div>
            <input
                type="checkbox"
                checked={selected}
                onChange={() => onToggle(service.id)}
            />
            {selected && service.id === 'web' && (
                <div>
                    <label>
                        Páginas
                        <input
                            type="number"
                            min={1}
                            value={pages}
                            onChange={e => onWebChange('pages', Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Idiomas
                        <input
                            type="number"
                            min={1}
                            value={langs}
                            onChange={e => onWebChange('langs', Number(e.target.value))}
                        />
                    </label>
                </div>
            )}
        </div>
    )
}