import { useState } from 'react'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import type { Budget, Service } from '../types/budget.types'

interface BudgetDetailProps {
  budget: Budget
}

const DESCRIPTIONS: Record<Service['id'], string> = {
  seo: 'Posicionamiento web en buscadores',
  ads: 'Campañas de publicidad digital',
  web: 'Desarrollo de una página web completa',
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

function webServicePrice(pages: number, langs: number): number {
  return 500 + (pages + langs) * 30
}

const BASE_PRICES: Record<string, number> = { seo: 300, ads: 400, web: 500 }

export default function BudgetDetail({ budget }: BudgetDetailProps) {
  const { client, services, total, date } = budget
  const [copied, setCopied] = useState(false)

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  function handleDownloadPDF() {
    const doc = new jsPDF()
    const margin = 20
    const W = doc.internal.pageSize.getWidth()
    const H = doc.internal.pageSize.getHeight()
    let y = 25

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(22)
    doc.setTextColor(30, 30, 30)
    doc.text('PRESUPUESTO', margin, y)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(120)
    doc.text(formatDate(date), W - margin, y, { align: 'right' })

    y += 10
    doc.setDrawColor(220)
    doc.line(margin, y, W - margin, y)

    y += 12
    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.setFont('helvetica', 'bold')
    doc.text('CLIENTE', margin, y)

    y += 8
    doc.setFontSize(15)
    doc.setTextColor(30)
    doc.text(client.name, margin, y)

    y += 7
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(90)
    doc.text(client.email, margin, y)
    y += 6
    doc.text(client.phone, margin, y)

    y += 14
    doc.setDrawColor(220)
    doc.line(margin, y, W - margin, y)

    y += 10
    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.setFont('helvetica', 'bold')
    doc.text('SERVICIOS CONTRATADOS', margin, y)

    y += 9
    services.forEach(s => {
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(30)
      doc.text(s.name, margin, y)

      y += 6
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100)
      doc.text(DESCRIPTIONS[s.id], margin, y)

      if (s.id === 'web') {
        y += 5
        doc.setTextColor(130)
        doc.text(`${s.pages ?? 1} páginas · ${s.langs ?? 1} idiomas`, margin, y)
        y += 9
      } else {
        y += 9
      }
    })

    y += 2
    doc.setDrawColor(220)
    doc.line(margin, y, W - margin, y)

    y += 10
    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.setFont('helvetica', 'bold')
    doc.text('DESGLOSE', margin, y)

    y += 9
    services.forEach(s => {
      const price =
        s.id === 'web'
          ? webServicePrice(s.pages ?? 1, s.langs ?? 1)
          : BASE_PRICES[s.id]

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(50)
      doc.text(s.name, margin, y)
      doc.text(`${price} €`, W - margin, y, { align: 'right' })

      y += 4
      doc.setDrawColor(235)
      doc.line(margin, y, W - margin, y)
      y += 8
    })

    y += 2
    doc.setFontSize(13)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30)
    doc.text('Total', margin, y)
    doc.text(`${total} €`, W - margin, y, { align: 'right' })

    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(170)
    doc.text('Frontender.itacademy', margin, H - 12)
    doc.text(formatDate(date), W - margin, H - 12, { align: 'right' })

    const slug = client.name.toLowerCase().replace(/\s+/g, '-')
    doc.save(`presupuesto-${slug}.pdf`)
  }

  return (
    <div className="detail-page">
      <div className="detail-card">
        <div className="detail-topbar">
          <Link to="/" className="detail-back">← Volver</Link>
          <span className="detail-date">{formatDate(date)}</span>
        </div>

        <section className="detail-section">
          <h1 className="detail-client-name">{client.name}</h1>
          <p className="detail-contact">{client.email}</p>
          <p className="detail-contact">{client.phone}</p>
        </section>

        <section className="detail-section">
          <h2 className="detail-section-title">Servicios contratados</h2>
          <ul className="detail-services">
            {services.map(s => (
              <li key={s.id} className="detail-service-item">
                <div className="detail-service-header">
                  <span className="detail-service-name">{s.name}</span>
                  {s.id === 'web' && (
                    <span className="detail-service-meta">
                      {s.pages ?? 1} páginas, {s.langs ?? 1} idiomas
                    </span>
                  )}
                </div>
                <span className="detail-service-desc">{DESCRIPTIONS[s.id]}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="detail-section">
          <h2 className="detail-section-title">Desglose</h2>
          <table className="detail-totals">
            <tbody>
              {services.map(s => {
                const price =
                  s.id === 'web'
                    ? webServicePrice(s.pages ?? 1, s.langs ?? 1)
                    : BASE_PRICES[s.id]
                return (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td className="detail-totals__amount">{price} €</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td className="detail-totals__amount">{total} €</td>
              </tr>
            </tfoot>
          </table>
        </section>

        <div className="detail-actions">
          <button type="button" className="btn-share" onClick={handleShare}>
            {copied ? '¡URL copiada!' : 'Compartir presupuesto'}
          </button>
          <button type="button" className="btn-download" onClick={handleDownloadPDF}>
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  )
}
