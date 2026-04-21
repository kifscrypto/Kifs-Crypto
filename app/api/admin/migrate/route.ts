import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { isAuthenticated } from '@/lib/auth'

export async function POST() {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sql = neon(process.env.DATABASE_URL!)
    const results: string[] = []

    await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS published BOOLEAN NOT NULL DEFAULT TRUE`
    results.push('✓ published column')

    await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS meta_title VARCHAR(200)`
    results.push('✓ meta_title column')

    await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS meta_description TEXT`
    results.push('✓ meta_description column')

    await sql`ALTER TABLE posts ALTER COLUMN week DROP NOT NULL`
    results.push('✓ week nullable')

    await sql`ALTER TABLE posts ALTER COLUMN exchange DROP NOT NULL`
    results.push('✓ exchange nullable')

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Migration failed' },
      { status: 500 }
    )
  }
}
