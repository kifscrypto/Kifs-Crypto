import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

async function fixPostContent() {
  try {
    console.log('[v0] Starting to fix post content formatting...')
    
    // Get all posts
    const posts = await sql`SELECT id, content FROM posts`
    
    for (const post of posts) {
      let newContent = post.content
      
      // Remove metadata line at the top (Starting Balance, Current Balance, Week, Exchange)
      newContent = newContent.replace(/^Starting Balance:.*?Week: \d+\n+/m, '')
      
      // Convert bold text that appears to be section headers to markdown headings
      newContent = newContent.replace(/^(\*\*)?(.+?)(\*\*)?$/gm, (match, p1, p2, p3, offset, string) => {
        const line = p2 || match
        
        // Check if this looks like a heading (short line, at start or after paragraph break, followed by content)
        const isBold = p1 && p3
        const nextLines = string.substring(offset + match.length)
        const hasContentAfter = nextLines.match(/^\n\n./)
        
        // Known heading patterns
        const headingPatterns = ['Why', 'The ', 'Week ', 'Starting balance', 'Bonus applied', 'Entry price', 'Exit price', 'Position size', 'Trading gain', 'close', 'Gain', 'Numbers']
        const isHeading = headingPatterns.some(pattern => line.startsWith(pattern))
        
        if (isHeading && isBold) {
          return `## ${line}`
        }
        return match
      })
      
      // Update the post
      await sql`UPDATE posts SET content = ${newContent} WHERE id = ${post.id}`
      console.log(`[v0] Fixed post ${post.id}`)
    }
    
    console.log('[v0] Post content formatting complete!')
  } catch (error) {
    console.error('[v0] Error fixing post content:', error)
    process.exit(1)
  }
}

fixPostContent()
