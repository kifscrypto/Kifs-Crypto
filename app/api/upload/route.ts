import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    console.log('[v0] Upload started')
    
    const authenticated = await isAuthenticated()
    console.log('[v0] Upload: auth check =', authenticated)
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('[v0] Uploading file:', file.name, 'size:', file.size)

    // Convert File to Buffer for upload
    const buffer = await file.arrayBuffer()
    console.log('[v0] Buffer created, size:', buffer.byteLength)

    // Upload to Vercel Blob (public store)
    console.log('[v0] Calling put() to Vercel Blob...')
    const blob = await put(file.name, buffer, { access: 'public' })
    console.log('[v0] Upload successful:', blob.url)

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('[v0] Upload error caught:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('[v0] Error message:', errorMessage)
    return NextResponse.json(
      { error: errorMessage || 'Upload failed' },
      { status: 500 }
    )
  }
}
