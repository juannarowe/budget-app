export interface Service {
    id: 'seo' | 'ads' | 'web'
    name: string
    price: number
    pages?: number
    langs?: number
}

export interface Client {
    name: string
    email: string
    phone: string
}

export interface Budget {
    id: string
    date: string
    client: Client
    services: Service[]
    total: number
}