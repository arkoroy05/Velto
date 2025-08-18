import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { z } from 'zod'
import { getDatabase } from '../../../lib/database'
import { getContextProcessor } from '../../../src/ai/context-processor'
import { getContextGraphService } from '../../../src/services/context-graph'
import { Context, APIResponse } from '../../../src/types'
import { logger } from '../../../src/utils/logger'

// Validation schemas
const CreateContextSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  projectId: z.string().optional(),
  type: z.enum(['conversation', 'code', 'documentation', 'research', 'idea', 'task', 'note', 'meeting', 'email', 'webpage', 'file', 'image', 'audio', 'video']),
  tags: z.array(z.string()).optional(),
  source: z.object({
    type: z.enum(['claude', 'cursor', 'copilot', 'windsurf', 'manual', 'api', 'webhook']),
    agentId: z.string().optional(),
    sessionId: z.string().optional()
  }).optional(),
  metadata: z.record(z.any()).optional()
})

const UpdateContextSchema = CreateContextSchema.partial()

// Helper function to extract user ID from request
const extractUserId = (request: NextRequest): string | null => {
  const userId = request.headers.get('x-user-id') || request.nextUrl.searchParams.get('userId')
  return userId
}

// GET /api/contexts - List contexts
export async function GET(request: NextRequest) {
  try {
    const userId = extractUserId(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 401 }
      )
    }

    const { searchParams } = request.nextUrl
    const projectId = searchParams.get('projectId')
    const type = searchParams.get('type')
    const tags = searchParams.get('tags')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const db = await getDatabase()
    const collection = db.collection<Context>('contexts')
    
    let filter: any = { userId: new ObjectId(userId) }
    
    if (projectId) {
      filter.projectId = new ObjectId(projectId)
    }
    
    if (type) {
      filter.type = type
    }
    
    if (tags) {
      const tagArray = tags.split(',').map(t => t.trim())
      filter.tags = { $in: tagArray }
    }

    const sort: any = {}
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1

    const contexts = await collection
      .find(filter)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .toArray()

    const total = await collection.countDocuments(filter)

    const response: APIResponse = {
      success: true,
      data: contexts.map(ctx => ({
        id: ctx._id?.toString(),
        title: ctx.title,
        content: ctx.content,
        type: ctx.type,
        tags: ctx.tags,
        projectId: ctx.projectId?.toString(),
        createdAt: ctx.createdAt,
        updatedAt: ctx.updatedAt,
        aiAnalysis: ctx.aiAnalysis,
        metadata: ctx.metadata
      })),
      pagination: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    logger.error('Error fetching contexts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contexts' },
      { status: 500 }
    )
  }
}

// POST /api/contexts - Create new context
export async function POST(request: NextRequest) {
  try {
    const userId = extractUserId(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = CreateContextSchema.parse(body)
    
    const context: Omit<Context, '_id'> = {
      title: validatedData.title,
      content: validatedData.content,
      type: validatedData.type,
      userId: new ObjectId(userId),
      ...(validatedData.projectId && { projectId: new ObjectId(validatedData.projectId) }),
      source: {
        type: validatedData.source?.type || 'manual',
        agentId: validatedData.source?.agentId || '',
        sessionId: validatedData.source?.sessionId || '',
        timestamp: new Date()
      },
      metadata: validatedData.metadata || {},
      tags: validatedData.tags || [],
      chunkIndex: 0,
      childContextIds: [],
      isArchived: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Generate embeddings
    context.embeddings = await getContextProcessor().generateEmbeddings(context.content!)

    // Analyze context with AI
    context.aiAnalysis = await getContextProcessor().analyzeContext(context as Context)

    // Save to database
    const db = await getDatabase()
    const collection = db.collection<Context>('contexts')
    const result = await collection.insertOne(context as Context)

    logger.info(`Context created: ${result.insertedId}`)

    // Create or update context graph if projectId exists
    if (context.projectId) {
      try {
        await getContextGraphService().buildContextGraph(context.projectId, context.userId)
        logger.info(`Context graph updated for project ${context.projectId}`)
      } catch (error) {
        logger.warn(`Failed to update context graph: ${error}`)
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        id: result.insertedId.toString(),
        title: context.title,
        content: context.content,
        type: context.type,
        tags: context.tags,
        projectId: context.projectId?.toString(),
        createdAt: context.createdAt,
        aiAnalysis: context.aiAnalysis
      },
      message: 'Context created successfully'
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        details: error.errors
      }, { status: 400 })
    }
    
    logger.error('Error creating context:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create context' },
      { status: 500 }
    )
  }
}
