import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Velto Memory MCP Server API Documentation',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      docs: '/api/docs',
      mcp: '/api/mcp',
      contexts: '/api/v1/contexts',
      projects: '/api/v1/projects',
      users: '/api/v1/users',
      search: '/api/v1/search',
      webhooks: '/api/v1/webhooks',
      analytics: '/api/v1/analytics'
    },
    documentation: 'https://docs.velto.ai',
    mcp: {
      server: 'velto-memory-server',
      version: '1.0.0',
      tools: [
        'save_context',
        'search_contexts',
        'get_context',
        'generate_prompt_version',
        'find_related_contexts',
        'get_project_contexts',
        'analyze_context'
      ]
    }
  })
}
