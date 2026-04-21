import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

async function migrateDatabase() {
  console.log('[v0] Starting database migration...')

  try {
    // Check if percent_gain column exists, add it if not
    await sql`
      ALTER TABLE journey_stats
      ADD COLUMN IF NOT EXISTS percent_gain DECIMAL(10, 4) DEFAULT 0
    `
    console.log('[v0] percent_gain column added/verified')

    // Ensure image_url column exists in posts table
    await sql`
      ALTER TABLE posts
      ADD COLUMN IF NOT EXISTS image_url VARCHAR(500)
    `
    console.log('[v0] image_url column added/verified in posts table')

    console.log('[v0] Database migration completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('[v0] Database migration failed:', error)
    process.exit(1)
  }
}

migrateDatabase()
