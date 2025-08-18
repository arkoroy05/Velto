import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { z } from 'zod'
import { getDatabase } from '../../../lib/database'
import { Project, APIResponse } from '../../../src/types'
import { logger } from '../../../src/utils/logger'

// Validation schemas
const CreateProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  isPublic: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  settings: z.object({
    autoCategorize: z.boolean().default(true),
    chunkSize: z.number().min(100).max(10000).default(1000),
    maxTokens: z.number().min(1000).max(100000).default(8000),
    aiModel: z.string().default('gpt-4')
  }).default({}),
  collaborators: z.array(z.object({
    userId: z.string(),
    role: z.enum(['owner', 'admin', 'editor', 'viewer']).default('viewer')
  })).default([])
})

// Helper function to extract user ID from request
const extractUserId = (request: NextRequest): string | null => {
  const userId = request.headers.get('x-user-id') || request.nextUrl.searchParams.get('userId')
  return userId
}

// GET /api/projects - List projects
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
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const isPublic = searchParams.get('isPublic')
    const tags = searchParams.get('tags')

    const db = await getDatabase()
    const collection = db.collection<Project>('projects')
    
    let filter: any = { 
      $or: [
        { userId: new ObjectId(userId) },
        { 'collaborators.userId': userId }
      ]
    }
    
    if (isPublic !== undefined) {
      filter.isPublic = isPublic === 'true'
    }
    
    if (tags) {
      const tagArray = tags.split(',').map(t => t.trim())
      filter.tags = { $in: tagArray }
    }

    const sort: any = {}
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1

    const projects = await collection
      .find(filter)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .toArray()

    const total = await collection.countDocuments(filter)

    const response: APIResponse = {
      success: true,
      data: projects.map(project => ({
        id: project._id?.toString(),
        name: project.name,
        description: project.description,
        isPublic: project.isPublic,
        tags: project.tags,
        settings: project.settings,
        collaborators: project.collaborators,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      })),
      pagination: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    logger.error('Error fetching projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create new project
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
    const validatedData = CreateProjectSchema.parse(body)
    
    const project: Omit<Project, '_id'> = {
      name: validatedData.name,
      description: validatedData.description || '',
      isPublic: validatedData.isPublic,
      tags: validatedData.tags,
      settings: {
        autoCategorize: validatedData.settings.autoCategorize,
        chunkSize: validatedData.settings.chunkSize,
        maxTokens: validatedData.settings.maxTokens,
        aiModel: validatedData.settings.aiModel
      },
      userId: new ObjectId(userId),
      collaborators: [
        { userId: new ObjectId(userId), role: 'owner', addedAt: new Date() },
        ...validatedData.collaborators.map(c => ({
          userId: new ObjectId(c.userId),
          role: c.role,
          addedAt: new Date()
        }))
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const db = await getDatabase()
    const collection = db.collection<Project>('projects')
    const result = await collection.insertOne(project as Project)

    logger.info(`Project created: ${result.insertedId}`)

    return NextResponse.json({
      success: true,
      data: {
        id: result.insertedId.toString(),
        name: project.name,
        description: project.description,
        isPublic: project.isPublic,
        tags: project.tags,
        settings: project.settings,
        collaborators: project.collaborators
      },
      message: 'Project created successfully'
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        details: error.errors
      }, { status: 400 })
    }
    
    logger.error('Error creating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
