const { neon } = require('@neondatabase/serverless')

const sql = neon(process.env.DATABASE_URL)

async function addImageColumn() {
  try {
    console.log('Adding image_url column to posts table...')
    
    await sql`
      ALTER TABLE posts 
      ADD COLUMN IF NOT EXISTS image_url TEXT
    `
    
    console.log('✅ image_url column added successfully')
  } catch (error) {
    console.error('❌ Error adding image column:', error)
    process.exit(1)
  }
}

addImageColumn()
