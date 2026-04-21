import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

async function cleanPostMetadata() {
  try {
    console.log('[v0] Starting post metadata cleanup...')
    
    // Remove the metadata line from post content
    const result = await sql`
      UPDATE posts 
      SET content = REGEXP_REPLACE(
        content,
        '^Starting Balance:.*?Week: \d+\n+',
        '',
        'gm'
      )
      WHERE slug = 'week-1-journey-begins'
      RETURNING id, slug, content
    `
    
    console.log('[v0] Cleanup complete:', result)
  } catch (error) {
    console.error('[v0] Error cleaning metadata:', error)
    process.exit(1)
  }
}

cleanPostMetadata()
