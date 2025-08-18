import { NextResponse } from 'next/server'
import { healthCheck } from '../../../lib/database'

export async function GET() {
  try {
    // Check database connection
    const isConnected = await healthCheck()
    
    return NextResponse.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: isConnected ? 'connected' : 'disconnected',
        api: 'running'
      },
      service: 'Velto Memory Backend',
      version: '1.0.0'
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Service unavailable',
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    )
  }
}
