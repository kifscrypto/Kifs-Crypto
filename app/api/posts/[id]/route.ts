import { NextRequest, NextResponse } from 'next/server'
import { getPostById, updatePost } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const post = await getPostById(parseInt(id))

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated()
    console.log('[v0] Edit post - Auth check:', authenticated)
    if (!authenticated) {
      console.log('[v0] Edit post - Unauthorized')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await req.json()
    console.log('[v0] Edit post - ID:', id, 'Body:', body)

    const post = await updatePost(parseInt(id), body)
    console.log('[v0] Edit post - Updated post:', post)

    // Revalidate affected pages
    revalidatePath('/blog')
    revalidatePath(`/blog/${post.slug}`)
    revalidatePath('/')
    revalidatePath('/admin/posts')

    return NextResponse.json(post)
  } catch (error) {
    console.error('[v0] Error updating post:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update post' },
      { status: 500 }
    )
  }
}
