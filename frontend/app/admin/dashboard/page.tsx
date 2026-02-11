'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { AdminRoute } from '@/components/protected-routes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Users, 
  Ticket, 
  LogOut, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Home,
  Settings,
  BarChart3
} from 'lucide-react'
import { apiClient } from '@/lib/api-client'

interface DashboardStats {
  totalResidences: number
  totalTickets: number
  openTickets: number
  totalUsers: number
}

interface Residence {
  id: string
  name: string
  address: string
  city: string
  units: number
  _count: {
    tickets: number
  }
}

interface ContactForm {
  id: string
  building: {
    name: string
    address: string
    city: string
    units: number
  }
  request: {
    subject: string
    description: string
    priority: string
  }
  identity: {
    name: string
    email: string
    phone: string
    role: string
  }
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalResidences: 0,
    totalTickets: 0,
    openTickets: 0,
    totalUsers: 0
  })
  const [residences, setResidences] = useState<Residence[]>([])
  const [recentTickets, setRecentTickets] = useState<ContactForm[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [contactFormsData, usersData] = await Promise.all([
        apiClient.getContactForms(),
        apiClient.getAdminUsers()
      ])

      const contactForms = contactFormsData as ContactForm[]
      const users = usersData as any[]

      // Extract unique residences from contact forms
      const uniqueResidences = Array.from(
        new Map(contactForms.map((form: ContactForm) => [form.building.name, form.building])).values()
      )
      
      setResidences(uniqueResidences as Residence[])
      setRecentTickets(contactForms.slice(0, 5))
      
      setStats({
        totalResidences: uniqueResidences.length,
        totalTickets: contactForms.length,
        openTickets: contactForms.filter((t: ContactForm) => t.status === 'NEW').length,
        totalUsers: users.length
      })
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-destructive text-white'
      case 'HIGH': return 'bg-orange-500 text-white'
      case 'MEDIUM': return 'bg-yellow-500 text-white'
      case 'LOW': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-destructive/10 text-destructive border-destructive/20'
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'RESOLVED': return 'bg-green-100 text-green-800 border-green-200'
      case 'CLOSED': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-white border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Building2 className="w-6 h-6 text-primary" />
              <h1 className="font-heading font-bold text-xl text-foreground">
                Admin Dashboard
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Residences</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalResidences}</div>
                <p className="text-xs text-muted-foreground">Managed properties</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTickets}</div>
                <p className="text-xs text-muted-foreground">All maintenance requests</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{stats.openTickets}</div>
                <p className="text-xs text-muted-foreground">Pending resolution</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">Registered users</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Residences */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Residences</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
                <CardDescription>Latest managed properties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {residences.slice(0, 5).map((residence) => (
                    <div key={residence.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div>
                        <h4 className="font-medium text-foreground">{residence.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {residence.address}, {residence.city}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{residence.units} units</Badge>
                        <Badge variant="outline">{residence._count.tickets} tickets</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Tickets */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Tickets</CardTitle>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </div>
                <CardDescription>Latest maintenance requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">{ticket.request.subject}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{ticket.building.name}</span>
                          <span>•</span>
                          <span>{ticket.identity.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(ticket.request.priority)}>
                          {ticket.request.priority}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminRoute>
  )
}
