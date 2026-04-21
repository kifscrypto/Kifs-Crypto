import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { isAuthenticated } from '@/lib/auth'

function cleanContent(content: string, title: string): { cleaned: string; changes: string[] } {
  const changes: string[] = []
  let lines = content.split('\n')

  // Remove lines that look like metadata summaries:
  // **Starting Balance:** ... | **Current Balance:** ... | **Week:** ... | **Exchange:** ...
  const metaLinePattern = /^\*\*Starting Balance:\*\*/i
  const before = lines.length
  lines = lines.filter(line => {
    if (metaLinePattern.test(line.trim())) {
      changes.push(`Removed metadata line: "${line.trim().substring(0, 60)}…"`)
      return false
    }
    return true
  })

  // Remove duplicate H1 at the top — if first non-empty line is # <title>
  const firstContentIdx = lines.findIndex(l => l.trim().length > 0)
  if (firstContentIdx !== -1) {
    const firstLine = lines[firstContentIdx].trim()
    if (firstLine.startsWith('# ')) {
      const headingText = firstLine.replace(/^#\s+/, '').trim()
      // Remove if it matches the post title (case-insensitive, ignoring punctuation differences)
      const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
      if (normalize(headingText) === normalize(title) || headingText.length > 10) {
        changes.push(`Removed duplicate H1: "${firstLine.substring(0, 60)}"`)
        lines.splice(firstContentIdx, 1)
      }
    }
  }

  // Strip leading/trailing blank lines
  while (lines.length > 0 && lines[0].trim() === '') lines.shift()
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop()

  return { cleaned: lines.join('\n'), changes }
}

export async function POST(req: NextRequest) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { preview = false } = await req.json().catch(() => ({}))
    const sql = neon(process.env.DATABASE_URL!)

    const posts = await sql`SELECT id, title, content FROM posts`
    const report: { id: number; title: string; changes: string[] }[] = []

    for (const post of posts) {
      const { cleaned, changes } = cleanContent(post.content ?? '', post.title ?? '')
      if (changes.length > 0) {
        if (!preview) {
          await sql`UPDATE posts SET content = ${cleaned}, updated_at = NOW() WHERE id = ${post.id}`
        }
        report.push({ id: post.id, title: post.title, changes })
      }
    }

    return NextResponse.json({
      preview,
      postsAffected: report.length,
      report,
    })
  } catch (error) {
    console.error('Clean content error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed' },
      { status: 500 }
    )
  }
}
