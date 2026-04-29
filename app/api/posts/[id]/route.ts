import { NextRequest, NextResponse } from 'next/server'
import { getPostById, updatePost, deletePost } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { syncExchangesFromPostsAction } from '@/app/actions/exchanges'

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

    // If post has an exchange, sync it to the exchanges list
    if (body.exchange) {
      try {
        console.log('[v0] Syncing exchanges after post update')
        await syncExchangesFromPostsAction()
      } catch (syncError) {
        console.error('[v0] Error syncing exchanges:', syncError)
        // Don't fail the post update if sync fails
      }
    }

    // Revalidate affected pages
    revalidatePath('/blog')
    revalidatePath(`/blog/${post.slug}`)
    revalidatePath('/exchanges')
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
    await deletePost(parseInt(id))
    revalidatePath('/blog')
    revalidatePath('/exchanges')
    revalidatePath('/')
    revalidatePath('/admin/posts')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete post' },
      { status: 500 }
    )
  }
}
