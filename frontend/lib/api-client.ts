const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    // Get token from localStorage
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('auth_token') 
      : null

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const config: RequestInit = {
      ...options,
      headers,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        // Pas de log console pour les erreurs API
        throw new Error(errorData.error || `Erreur HTTP! statut: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      // Pas de log console pour les erreurs réseau
      throw error
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  // Residence endpoints
  async getResidences() {
    return this.request('/residences')
  }

  async getResidence(id: string) {
    return this.request(`/residences/${id}`)
  }

  async createResidence(data: any) {
    return this.request('/residences', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateResidence(id: string, data: any) {
    return this.request(`/residences/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteResidence(id: string) {
    return this.request(`/residences/${id}`, {
      method: 'DELETE',
    })
  }

  // Ticket endpoints
  async getTickets(params?: { status?: string; priority?: string; residenceId?: string }) {
    const searchParams = new URLSearchParams(params as any).toString()
    const endpoint = searchParams ? `/tickets?${searchParams}` : '/tickets'
    return this.request(endpoint)
  }

  async getTicket(id: string) {
    return this.request(`/tickets/${id}`)
  }

  async createTicket(data: any) {
    return this.request('/tickets', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateTicket(id: string, data: any) {
    return this.request(`/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteTicket(id: string) {
    return this.request(`/tickets/${id}`, {
      method: 'DELETE',
    })
  }

  // User endpoints
  async getUsers() {
    return this.request('/users')
  }

  async getUser(id: string) {
    return this.request(`/users/${id}`)
  }

  async updateUser(id: string, data: any) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteUser(id: string) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    })
  }

  // Admin endpoints
  async registerAdmin(data: any) {
    return this.request('/auth/register-admin', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getAdminUsers() {
    return this.request('/auth/users')
  }

  async getContactForms() {
    return this.request('/admin/contact-forms')
  }

  // Contact form submit
  async submitContactForm(data: any) {
    return this.request('/contact/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Health check
  async healthCheck() {
    return this.request('/health')
  }

  // Calendly endpoints
  async getCalendlyStats() {
    return this.request('/calendly/stats')
  }

  async getCalendlyEvents() {
    return this.request('/calendly/events')
  }

  async sendCalendlyWebhook(data: any) {
    return this.request('/calendly/webhook', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
export default apiClient
