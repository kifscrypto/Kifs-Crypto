import { neon } from '@neondatabase/serverless'

async function migrate() {
  try {
    console.log('[v0] Creating categories table...')

    const sql = neon(process.env.DATABASE_URL)

    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        slug VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `

    console.log('[v0] Inserting category data...')

    await sql`
      INSERT INTO categories (name, slug, description) VALUES
      ('Weekly Updates', 'weekly-updates', 'Weekly journey posts documenting the $1K challenge progress'),
      ('Bonus Guides', 'bonus-guides', 'Step-by-step guides on how to claim and maximise exchange bonuses')
      ON CONFLICT DO NOTHING
    `

    console.log('[v0] Adding category_id to posts table...')

    await sql`
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES categories(id)
    `

    console.log('[v0] Categories migration completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('[v0] Migration failed:', error)
    process.exit(1)
  }
}

migrate()
