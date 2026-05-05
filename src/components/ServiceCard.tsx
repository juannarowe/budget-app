import type { Service } from '../types/budget.types'
import WebConfigurator from './WebConfigurator'

interface ServiceCardProps {
  service: Service
  description: string
  selected: boolean
  pages: number
  langs: number
  onToggle(id: string): void
  onWebChange(field: 'pages' | 'langs', value: number): void
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
  const webPrice = 500 + (pages + langs) * 30

  return (
    <div className={`service-card${selected ? ' card--selected' : ''}`}>
      <div className="service-card__main">
        <div className="service-card__info">
          <span className="service-card__name">{service.name}</span>
          <span className="service-card__desc">{description}</span>
        </div>

        <span className="service-card__price">
          {service.id === 'web' && selected ? webPrice : service.price}
          <span className="service-card__currency"> €</span>
        </span>

        <label className="service-card__toggle">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggle(service.id)}
          />
          Añadir
        </label>
      </div>

      {service.id === 'web' && selected && (
        <WebConfigurator pages={pages} langs={langs} onChange={onWebChange} />
      )}
    </div>
  )
}
