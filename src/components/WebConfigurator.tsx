interface WebConfiguratorProps {
  pages: number
  langs: number
  onChange(field: 'pages' | 'langs', value: number): void
}

export default function WebConfigurator({ pages, langs, onChange }: WebConfiguratorProps) {
  function adjust(field: 'pages' | 'langs', current: number, delta: number) {
    const next = current + delta
    if (next >= 1) onChange(field, next)
  }

  return (
    <div className="web-configurator">
      <div className="web-configurator__row">
        <span className="web-configurator__label">
          Número de páginas
          <span className="info-wrap">
            <button type="button" className="info-btn" aria-label="Información sobre páginas">i</button>
            <span className="info-tooltip" role="tooltip">
              Añade el número de páginas que tendrá tu web. El coste de cada página es de 30€.
            </span>
          </span>
        </span>
        <div className="web-configurator__controls">
          <button
            type="button"
            className="stepper-btn"
            onClick={() => adjust('pages', pages, -1)}
            disabled={pages <= 1}
            aria-label="Reducir páginas"
          >
            −
          </button>
          <span className="stepper-value">{pages}</span>
          <button
            type="button"
            className="stepper-btn"
            onClick={() => adjust('pages', pages, 1)}
            aria-label="Aumentar páginas"
          >
            +
          </button>
        </div>
      </div>

      <div className="web-configurator__row">
        <span className="web-configurator__label">
          Número de idiomas
          <span className="info-wrap">
            <button type="button" className="info-btn" aria-label="Información sobre idiomas">i</button>
            <span className="info-tooltip" role="tooltip">
              Añade los idiomas que tendrá tu proyecto. El coste de cada idioma es de 30€.
            </span>
          </span>
        </span>
        <div className="web-configurator__controls">
          <button
            type="button"
            className="stepper-btn"
            onClick={() => adjust('langs', langs, -1)}
            disabled={langs <= 1}
            aria-label="Reducir idiomas"
          >
            −
          </button>
          <span className="stepper-value">{langs}</span>
          <button
            type="button"
            className="stepper-btn"
            onClick={() => adjust('langs', langs, 1)}
            aria-label="Aumentar idiomas"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
