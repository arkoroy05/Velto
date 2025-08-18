import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { z } from 'zod'
import { databaseService } from '../../../../src/services/database'
import { getContextProcessor } from '../../../../src/ai/context-processor'
import { getContextGraphService } from '../../../../src/services/context-graph'
import { Context, APIResponse } from '../../../../src/types'
import { logger } from '../../../../src/utils/logger'

const UpdateContextSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
  projectId: z.string().optional(),
  type: z.enum(['conversation', 'code', 'documentation', 'research', 'idea', 'task', 'note', 'meeting', 'email', 'webpage', 'file', 'image', 'audio', 'video']).optional(),
  tags: z.array(z.string()).optional(),
  source: z.object({
    type: z.enum(['claude', 'cursor', 'copilot', 'windsurf', 'manual', 'api', 'webhook']),
    agentId: z.string().optional(),
    sessionId: z.string().optional()
  }).optional(),
  metadata: z.record(z.any()).optional()
})

// Helper function to extract user ID from request
const extractUserId = (request: NextRequest): string | null => {
  const userId = request.headers.get('x-user-id') || request.nextUrl.searchParams.get('userId')
  return userId
}

// GET /api/contexts/[id] - Get specific context
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = extractUserId(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 401 }
      )
    }

    const { id } = params
    
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid context ID' },
        { status: 400 }
      )
    }

    const collection = databaseService.getCollection<Context>('contexts')
    const context = await collection.findOne({
      _id: new ObjectId(id),
      userId: new ObjectId(userId)
    })

    if (!context) {
      return NextResponse.json(
        { success: false, error: 'Context not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: context._id?.toString(),
        title: context.title,
        content: context.content,
        type: context.type,
        tags: context.tags,
        projectId: context.projectId?.toString(),
        createdAt: context.createdAt,
        updatedAt: context.updatedAt,
        aiAnalysis: context.aiAnalysis,
        metadata: context.metadata,
        source: context.source,
        embeddings: context.embeddings ? 'present' : null // Don't send full embeddings
      }
    })
  } catch (error) {
    logger.error('Error fetching context:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch context' },
      { status: 500 }
    )
  }
}

// PUT /api/contexts/[id] - Update context
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = extractUserId(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 401 }
      )
    }

    const { id } = params
    
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid context ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const validatedData = UpdateContextSchema.parse(body)
    
    const collection = databaseService.getCollection<Context>('contexts')
    
    // Check if context exists and belongs to user
    const existingContext = await collection.findOne({
      _id: new ObjectId(id),
      userId: new ObjectId(userId)
    })

    if (!existingContext) {
      return NextResponse.json(
        { success: false, error: 'Context not found' },
        { status: 404 }
      )
    }

    const updateData: any = {
      ...validatedData,
      updatedAt: new Date()
    }

    // Update projectId if provided
    if (validatedData.projectId) {
      updateData.projectId = new ObjectId(validatedData.projectId)
    }

    // Regenerate embeddings if content changed
    if (validatedData.content && validatedData.content !== existingContext.content) {
      updateData.embeddings = await getContextProcessor().generateEmbeddings(validatedData.content)
      
      // Re-analyze context
      const updatedContext = { ...existingContext, ...updateData }
      updateData.aiAnalysis = await getContextProcessor().analyzeContext(updatedContext as Context)
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Context not found' },
        { status: 404 }
      )
    }

    // Update context graph if projectId exists
    if (validatedData.projectId || existingContext.projectId) {
      try {
        const projectId = validatedData.projectId ? new ObjectId(validatedData.projectId) : existingContext.projectId!
        await getContextGraphService().buildContextGraph(projectId, new ObjectId(userId))
        logger.info(`Context graph updated after context modification`)
      } catch (error) {
        logger.warn(`Failed to update context graph: ${error}`)
      }
    }

    logger.info(`Context updated: ${id}`)

    return NextResponse.json({
      success: true,
      message: 'Context updated successfully'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        details: error.errors
      }, { status: 400 })
    }
    
    logger.error('Error updating context:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update context' },
      { status: 500 }
    )
  }
}

// DELETE /api/contexts/[id] - Delete context
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = extractUserId(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 401 }
      )
    }

    const { id } = params
    
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid context ID' },
        { status: 400 }
      )
    }

    const collection = databaseService.getCollection<Context>('contexts')
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      userId: new ObjectId(userId)
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Context not found' },
        { status: 404 }
      )
    }

    logger.info(`Context deleted: ${id}`)

    return NextResponse.json({
      success: true,
      message: 'Context deleted successfully'
    })
  } catch (error) {
    logger.error('Error deleting context:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete context' },
      { status: 500 }
    )
  }
}
