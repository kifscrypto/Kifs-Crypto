import { NextRequest, NextResponse } from 'next/server'
import { getPosts, getLatestPosts, createPost } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const latest = searchParams.get('latest')

    if (latest) {
      const limit = parseInt(latest) || 3
      const posts = await getLatestPosts(limit)
      return NextResponse.json(posts)
    }

    const posts = await getPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    console.log('[v0] Creating post with data:', { title: body.title, slug: body.slug, week: body.week })
    
    const post = await createPost(body)
    
    console.log('[v0] Post created successfully:', { id: post.id, slug: post.slug })
    
    // Revalidate affected pages
    revalidateTag('posts')
    revalidatePath('/blog')
    revalidatePath('/admin/posts')
    revalidatePath('/')

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating post:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create post' },
      { status: 500 }
    )
  }
}
