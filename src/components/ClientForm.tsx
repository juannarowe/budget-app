import { useState } from 'react'
import type { SyntheticEvent, ChangeEvent } from 'react'
import type { Client } from '../types/budget.types'

interface ClientFormProps {
    total: number
    onSubmit(client: Client): void
}

export default function ClientForm({ total, onSubmit }: ClientFormProps) {
    const [client, setClient] = useState<Client>({ name: '', email: '', phone: '' })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setClient(prev => ({ ...prev, [name]: value}))
    }

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()
        onSubmit(client)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={client.name}
                onChange={handleChange}
                placeholder="Nombre"
            />
            <input
                name="email"
                value={client.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                name="phone"
                value={client.phone}
                onChange={handleChange}
                placeholder="Teléfono"
            />
            <p>Total: {total} €</p>
            <button type="submit" disabled={total === 0}>
                Solicitar presupuesto
            </button>
        </form>
    )
}