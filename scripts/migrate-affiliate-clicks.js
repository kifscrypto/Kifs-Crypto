import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

async function migrate() {
  try {
    console.log('[v0] Creating affiliate_clicks table...')

    // Create affiliate_clicks table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS affiliate_clicks (
        id SERIAL PRIMARY KEY,
        exchange VARCHAR(100) NOT NULL,
        referral_url TEXT NOT NULL,
        clicked_at TIMESTAMP DEFAULT NOW(),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `

    // Create index for better query performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_exchange 
      ON affiliate_clicks(exchange)
    `

    await sql`
      CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_clicked_at 
      ON affiliate_clicks(clicked_at)
    `

    console.log('[v0] affiliate_clicks table created successfully')
    console.log('[v0] Migration complete')
  } catch (error) {
    console.error('[v0] Migration error:', error)
    process.exit(1)
  }
}

migrate()
