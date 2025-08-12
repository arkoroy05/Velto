"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Loader2, Eye, EyeOff } from 'lucide-react'

interface EarlyAccessRegistration {
  _id: string
  email: string
  feedback?: string
  source?: string
  timestamp: string
  createdAt: string
  status: string
  ipAddress?: string
  userAgent?: string
}

interface AdminResponse {
  registrations: EarlyAccessRegistration[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<EarlyAccessRegistration[]>([])
  const [pagination, setPagination] = useState({ page: 1, limit: 50, total: 0, pages: 0 })
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [error, setError] = useState('')

  const fetchRegistrations = async (page = 1) => {
    if (!apiKey) return
    
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`/api/early-access/admin?page=${page}&limit=50`, {
        headers: {
          'x-api-key': apiKey
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch registrations')
      }
      
      const data: AdminResponse = await response.json()
      setRegistrations(data.registrations)
      setPagination(data.pagination)
    } catch (err) {
      setError('Failed to fetch registrations')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waitlist': return 'bg-yellow-500'
      case 'approved': return 'bg-green-500'
      case 'rejected': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Early Access Admin</h1>
          <p className="text-muted-foreground">View and manage early access registrations</p>
        </div>

        {/* API Key Input */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Input
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="Enter API Key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button 
                onClick={() => fetchRegistrations(1)}
                disabled={!apiKey || loading}
              >
                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Load Registrations
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
            {error}
          </div>
        )}

        {/* Statistics */}
        {pagination.total > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-foreground">{pagination.total}</div>
                <div className="text-sm text-muted-foreground">Total Registrations</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-foreground">
                  {registrations.filter(r => r.status === 'waitlist').length}
                </div>
                <div className="text-sm text-muted-foreground">On Waitlist</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-foreground">
                  {registrations.filter(r => r.status === 'approved').length}
                </div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-foreground">
                  {registrations.filter(r => r.status === 'rejected').length}
                </div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Registrations List */}
        {registrations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {registrations.map((registration) => (
                  <div key={registration._id} className="border border-border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{registration.email}</h3>
                          <Badge className={getStatusColor(registration.status)}>
                            {registration.status}
                          </Badge>
                          {registration.source && (
                            <Badge variant="outline">{registration.source}</Badge>
                          )}
                        </div>
                        {registration.feedback && (
                          <p className="text-muted-foreground text-sm mb-2">
                            {registration.feedback}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span>Created: {formatDate(registration.createdAt)}</span>
                          {registration.ipAddress && <span>IP: {registration.ipAddress}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => fetchRegistrations(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => fetchRegistrations(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
