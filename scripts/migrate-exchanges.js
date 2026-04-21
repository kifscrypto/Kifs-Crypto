import { neon } from '@neondatabase/serverless'

async function migrate() {
  try {
    console.log('[v0] Creating exchanges table...')
    
    const sql = neon(process.env.DATABASE_URL)
    
    await sql`
      CREATE TABLE IF NOT EXISTS exchanges (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        slug VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        bonus_amount VARCHAR(50),
        bonus_type VARCHAR(100),
        difficulty VARCHAR(10) CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
        status VARCHAR(20) CHECK (status IN ('Claimed', 'Active Now', 'Coming Soon')) DEFAULT 'Coming Soon',
        week_claimed VARCHAR(20),
        referral_link TEXT,
        logo_url VARCHAR(255),
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `
    
    console.log('[v0] Exchanges table created successfully!')
    process.exit(0)
  } catch (error) {
    console.error('[v0] Migration failed:', error)
    process.exit(1)
  }
}

migrate()
