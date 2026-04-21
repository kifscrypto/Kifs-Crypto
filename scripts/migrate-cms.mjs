import { neon } from '@neondatabase/serverless'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL)

async function migrate() {
  console.log('Running CMS migration...')

  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS published BOOLEAN NOT NULL DEFAULT TRUE`
  console.log('✓ published column')

  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS meta_title VARCHAR(200)`
  console.log('✓ meta_title column')

  await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS meta_description TEXT`
  console.log('✓ meta_description column')

  // Make week, exchange, balance nullable so regular (non-journey) articles can be saved
  await sql`ALTER TABLE posts ALTER COLUMN week DROP NOT NULL`
  console.log('✓ week nullable')

  await sql`ALTER TABLE posts ALTER COLUMN exchange DROP NOT NULL`
  console.log('✓ exchange nullable')

  console.log('Migration complete.')
  process.exit(0)
}

migrate().catch(err => { console.error(err); process.exit(1) })
