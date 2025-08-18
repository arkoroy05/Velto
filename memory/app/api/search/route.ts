import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { z } from 'zod'
import { getDatabase } from '../../../lib/database'
import { getContextProcessor } from '../../../src/ai/context-processor'
import { Context, APIResponse } from '../../../src/types'
import { logger } from '../../../src/utils/logger'

// Validation schemas
const SearchQuerySchema = z.object({
  query: z.string().min(1),
  userId: z.string(),
  projectId: z.string().optional(),
  searchType: z.enum(['text', 'semantic', 'hybrid', 'rag']).default('semantic'),
  filters: z.object({
    types: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    dateRange: z.object({
      start: z.string().optional(),
      end: z.string().optional()
    }).optional()
  }).optional(),
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0)
})

// Helper function to extract user ID from request
const extractUserId = (request: NextRequest): string | null => {
  const userId = request.headers.get('x-user-id') || request.nextUrl.searchParams.get('userId')
  return userId
}

// POST /api/search - Advanced search with semantic capabilities
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = SearchQuerySchema.parse(body)
    
    const collection = getDatabase().getCollection<Context>('contexts')
    
    // Build base filter
    let filter: any = { userId: new ObjectId(validatedData.userId) }
    
    if (validatedData.projectId) {
      filter.projectId = new ObjectId(validatedData.projectId)
    }

    // Apply filters
    if (validatedData.filters?.types && validatedData.filters.types.length > 0) {
      filter.type = { $in: validatedData.filters.types }
    }

    if (validatedData.filters?.tags && validatedData.filters.tags.length > 0) {
      filter.tags = { $in: validatedData.filters.tags }
    }

    if (validatedData.filters?.dateRange) {
      const dateFilter: any = {}
      if (validatedData.filters.dateRange.start) {
        dateFilter.$gte = new Date(validatedData.filters.dateRange.start)
      }
      if (validatedData.filters.dateRange.end) {
        dateFilter.$lte = new Date(validatedData.filters.dateRange.end)
      }
      if (Object.keys(dateFilter).length > 0) {
        filter.createdAt = dateFilter
      }
    }

    // Get all contexts matching the filter
    const allContexts = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray()

    let results: Array<{ context: Context; relevance: number }> = []

    // Perform search based on type
    switch (validatedData.searchType) {
      case 'semantic':
        results = await getContextProcessor().semanticSearch(
          validatedData.query, 
          allContexts, 
          validatedData.limit
        )
        break
        
      case 'rag':
        // For RAG, we'll return the top contexts and generate a response
        const ragResults = await getContextProcessor().semanticSearch(
          validatedData.query, 
          allContexts, 
          validatedData.limit
        )
        results = ragResults
        
        // Generate RAG response
        const ragResponse = await getContextProcessor().generateRAGResponse(
          validatedData.query,
          allContexts,
          1000
        )
        
        // Add RAG response to results
        return NextResponse.json({
          success: true,
          data: results.map(({ context, relevance }) => ({
            id: context._id?.toString(),
            title: context.title,
            content: context.content,
            type: context.type,
            tags: context.tags,
            projectId: context.projectId?.toString(),
            createdAt: context.createdAt,
            updatedAt: context.updatedAt,
            relevance: relevance
          })),
          ragResponse,
          pagination: {
            page: Math.floor(validatedData.offset / validatedData.limit) + 1,
            limit: validatedData.limit,
            total: results.length
          }
        })
        
      case 'hybrid':
        // Combine text search with semantic search
        const textResults = allContexts.filter(ctx => 
          ctx.title?.toLowerCase().includes(validatedData.query.toLowerCase()) ||
          ctx.content?.toLowerCase().includes(validatedData.query.toLowerCase())
        ).map(ctx => ({ context: ctx, relevance: 0.8 }))
        
        const hybridSemanticResults = await getContextProcessor().semanticSearch(
          validatedData.query, 
          allContexts, 
          Math.floor(validatedData.limit / 2)
        )
        
        // Merge and deduplicate results
        const allResults = [...textResults, ...hybridSemanticResults]
        const seenIds = new Set()
        results = allResults.filter(({ context }) => {
          const id = context._id?.toString()
          if (seenIds.has(id)) return false
          seenIds.add(id)
          return true
        }).slice(0, validatedData.limit)
        break
        
      default: // text search
        results = allContexts.filter(ctx => 
          ctx.title?.toLowerCase().includes(validatedData.query.toLowerCase()) ||
          ctx.content?.toLowerCase().includes(validatedData.query.toLowerCase())
        ).map(ctx => ({ context: ctx, relevance: 0.8 }))
        break
    }

    // Apply pagination
    const paginatedResults = results.slice(validatedData.offset, validatedData.offset + validatedData.limit)

    const response: APIResponse = {
      success: true,
      data: paginatedResults.map(({ context, relevance }) => ({
        id: context._id?.toString(),
        title: context.title,
        content: context.content,
        type: context.type,
        tags: context.tags,
        projectId: context.projectId?.toString(),
        createdAt: context.createdAt,
        updatedAt: context.updatedAt,
        relevance: relevance
      })),
      pagination: {
        page: Math.floor(validatedData.offset / validatedData.limit) + 1,
        limit: validatedData.limit,
        total: results.length
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        details: error.errors
      }, { status: 400 })
    }
    
    logger.error('Error performing search:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to perform search' },
      { status: 500 }
    )
  }
}

// GET /api/search/suggestions - Get search suggestions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const query = searchParams.get('query')
    const userId = searchParams.get('userId')
    
    if (!query || !userId) {
      return NextResponse.json({
        success: false,
        error: 'Query and userId are required'
      }, { status: 400 })
    }

    const collection = getDatabase().getCollection<Context>('contexts')
    
    // Get contexts for the user
    const contexts = await collection
      .find({ userId: new ObjectId(userId) })
      .limit(100)
      .toArray()

    // Generate suggestions based on titles and content
    const suggestions = new Set<string>()
    
    // Add query itself as a suggestion
    suggestions.add(query)
    
    // Add matching titles
    contexts.forEach(ctx => {
      if (ctx.title?.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(ctx.title)
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        suggestions: Array.from(suggestions).slice(0, 10),
        query: query
      }
    })
  } catch (error) {
    logger.error('Error getting search suggestions:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to get search suggestions'
    }, { status: 500 })
  }
}
