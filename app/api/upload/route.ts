import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    // Convert to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Vercel Blob
    const blob = await put(file.name, buffer, { 
      access: 'public',
      addRandomSuffix: true,
    })

    return NextResponse.json({ url: blob.url }, { status: 200 })
  } catch (error) {
    console.error('[v0] Upload error:', error instanceof Error ? error.message : String(error))
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Upload failed',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}
