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
  totalForms: number
  newForms: number
  processedForms: number
  totalAdmins: number
}

interface ContactFormSubmission {
  id: string
  building: any
  request: any
  identity: any
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalForms: 0,
    newForms: 0,
    processedForms: 0,
    totalAdmins: 0
  })
  const [contactForms, setContactForms] = useState<ContactFormSubmission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      console.log('🔍 Fetching dashboard data...')
      
      // Only fetch contact forms (remove admin users call that's causing 404)
      const contactFormsData = await apiClient.getContactForms()
      
      console.log('✅ Contact forms data:', contactFormsData)

      const contactForms = contactFormsData as ContactFormSubmission[]

      setContactForms(contactForms)
      
      setStats({
        totalForms: contactForms.length,
        newForms: contactForms.filter(form => form.status === 'NEW').length,
        processedForms: contactForms.filter(form => form.status !== 'NEW').length,
        totalAdmins: 1 // Hardcoded for now since admin users endpoint is failing
      })
    } catch (error) {
      console.error('❌ Failed to fetch dashboard data:', error)
      // Set default stats on error
      setStats({
        totalForms: 0,
        newForms: 0,
        processedForms: 0,
        totalAdmins: 1
      })
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
                <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalForms}</div>
                <p className="text-xs text-muted-foreground">Total form submissions</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Forms</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{stats.newForms}</div>
                <p className="text-xs text-muted-foreground">Pending review</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Processed Forms</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.processedForms}</div>
                <p className="text-xs text-muted-foreground">Completed reviews</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalAdmins}</div>
                <p className="text-xs text-muted-foreground">Admin users</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enhanced Contact Form Submissions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Contact Form Submissions</CardTitle>
                  <Badge variant="secondary">{contactForms.length} total</Badge>
                </div>
                <CardDescription>People who filled the contact form with full details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactForms.map((form) => (
                    <div key={form.id} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      {/* Header with name and status */}
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">
                            {form.identity?.name || 'Unknown Person'}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {form.identity?.role || 'No role specified'} • {form.building?.name || 'No building'}
                          </p>
                        </div>
                        <Badge variant={form.status === 'NEW' ? 'destructive' : 'secondary'}>
                          {form.status}
                        </Badge>
                      </div>
                      
                      {/* Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">📧</span>
                          <span>{form.identity?.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">📱</span>
                          <span>{form.identity?.phone || 'No phone'}</span>
                        </div>
                      </div>
                      
                      {/* Building Information */}
                      <div className="bg-muted/50 rounded p-3 mb-3">
                        <h5 className="font-medium text-sm mb-2">🏢 Building Information</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Name:</span> {form.building?.name || 'N/A'}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Address:</span> {form.building?.address || 'N/A'}
                          </div>
                          <div>
                            <span className="text-muted-foreground">City:</span> {form.building?.city || 'N/A'}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Units:</span> {form.building?.units || 'N/A'}
                          </div>
                        </div>
                        {form.building?.description && (
                          <div className="mt-2 text-sm">
                            <span className="text-muted-foreground">Description:</span> {form.building.description}
                          </div>
                        )}
                      </div>
                      
                      {/* Request Information */}
                      <div className="bg-muted/50 rounded p-3 mb-3">
                        <h5 className="font-medium text-sm mb-2">📝 Request Details</h5>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Subject:</span> {form.request?.subject || 'N/A'}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Priority:</span> 
                            <Badge variant="outline" className="ml-2">
                              {form.request?.priority || 'N/A'}
                            </Badge>
                          </div>
                          {form.request?.description && (
                            <div>
                              <span className="text-muted-foreground">Description:</span> {form.request.description}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Timestamp */}
                      <div className="text-xs text-muted-foreground border-t pt-2">
                        Submitted: {new Date(form.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                  {contactForms.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="text-4xl mb-2">📋</div>
                      <div>No contact form submissions yet</div>
                      <div className="text-sm">When people fill the contact form, they will appear here</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Summary Statistics */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Summary Statistics</CardTitle>
                  <BarChart3 className="w-5 h-5 text-muted-foreground" />
                </div>
                <CardDescription>Overview of all contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Stats Overview */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{stats.totalForms}</div>
                      <div className="text-sm text-blue-600">Total Submissions</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{stats.newForms}</div>
                      <div className="text-sm text-orange-600">Pending Review</div>
                    </div>
                  </div>

                  {/* Recent Submissions List */}
                  <div>
                    <h5 className="font-medium mb-3">📋 Recent Submissions</h5>
                    <div className="space-y-2">
                      {contactForms.slice(0, 5).map((form, index) => (
                        <div key={form.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{form.identity?.name || 'Anonymous'}</div>
                              <div className="text-xs text-muted-foreground">{form.identity?.email || 'No email'}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="text-xs">
                              {form.building?.name || 'No building'}
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">
                              {new Date(form.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                      {contactForms.length === 0 && (
                        <div className="text-center py-4 text-muted-foreground text-sm">
                          No submissions yet
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="border-t pt-4">
                    <h5 className="font-medium mb-3">🚀 Quick Actions</h5>
                    <div className="grid grid-cols-1 gap-2">
                      <Button variant="outline" size="sm" className="justify-start">
                        <Eye className="w-4 h-4 mr-2" />
                        View All Submissions ({contactForms.length})
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Manage Form Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminRoute>
  )
}
