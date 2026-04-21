import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  exchange: string | null
  balance: number | null
  week: number | null
  date: string
  image_url: string | null
  published: boolean
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

export interface JourneyStats {
  id: number
  starting_balance: number
  current_balance: number
  target_balance: number
  current_exchange: string
  week: number
  percent_gain: number
  updated_at: string
}

export interface AffiliateClick {
  id: number
  exchange: string
  referral_url: string
  clicked_at: string
}

export interface AffiliateStats {
  exchange: string
  total_clicks: number
  last_click: string | null
}

export async function getPosts(): Promise<BlogPost[]> {
  const posts = await sql`
    SELECT * FROM posts
    ORDER BY date DESC
  `
  return posts as BlogPost[]
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await sql`
    SELECT * FROM posts
    WHERE published = TRUE
    ORDER BY date DESC
  `
  return posts as BlogPost[]
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await sql`
    SELECT * FROM posts 
    WHERE slug = ${slug}
  `
  return (posts[0] as BlogPost) || null
}

export async function getPostById(id: number): Promise<BlogPost | null> {
  const posts = await sql`
    SELECT * FROM posts 
    WHERE id = ${id}
  `
  return (posts[0] as BlogPost) || null
}

export async function getLatestPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await sql`
    SELECT * FROM posts
    WHERE published = TRUE
    ORDER BY date DESC
    LIMIT ${limit}
  `
  return posts as BlogPost[]
}

export async function createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> {
  const result = await sql`
    INSERT INTO posts (slug, title, excerpt, content, exchange, balance, week, date, image_url, published, meta_title, meta_description)
    VALUES (
      ${post.slug},
      ${post.title},
      ${post.excerpt},
      ${post.content},
      ${post.exchange ?? null},
      ${post.balance ?? null},
      ${post.week ?? null},
      ${post.date},
      ${post.image_url ?? null},
      ${post.published ?? true},
      ${post.meta_title ?? null},
      ${post.meta_description ?? null}
    )
    RETURNING *
  `
  return result[0] as BlogPost
}

export async function updatePost(id: number, post: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>): Promise<BlogPost> {
  const result = await sql`
    UPDATE posts SET
      slug             = COALESCE(${post.slug    ?? null}, slug),
      title            = COALESCE(${post.title   ?? null}, title),
      excerpt          = COALESCE(${post.excerpt  ?? null}, excerpt),
      content          = COALESCE(${post.content  ?? null}, content),
      date             = COALESCE(${post.date     ?? null}, date),
      exchange         = ${post.exchange         ?? null},
      balance          = ${post.balance          ?? null},
      week             = ${post.week             ?? null},
      image_url        = ${post.image_url        ?? null},
      published        = COALESCE(${post.published != null ? post.published : null}, published),
      meta_title       = ${post.meta_title       ?? null},
      meta_description = ${post.meta_description ?? null},
      updated_at       = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return result[0] as BlogPost
}

export async function deletePost(id: number): Promise<void> {
  await sql`DELETE FROM posts WHERE id = ${id}`
}

export async function getJourneyStats(): Promise<JourneyStats | null> {
  const stats = await sql`
    SELECT * FROM journey_stats 
    ORDER BY updated_at DESC
    LIMIT 1
  `
  return (stats[0] as JourneyStats) || null
}

export async function updateJourneyStats(stats: Partial<Omit<JourneyStats, 'id' | 'updated_at'>>): Promise<JourneyStats> {
  const result = await sql`
    UPDATE journey_stats 
    SET 
      starting_balance = COALESCE(${stats.starting_balance !== undefined ? stats.starting_balance : null}, starting_balance),
      current_balance = COALESCE(${stats.current_balance !== undefined ? stats.current_balance : null}, current_balance),
      target_balance = COALESCE(${stats.target_balance !== undefined ? stats.target_balance : null}, target_balance),
      current_exchange = COALESCE(${stats.current_exchange || null}, current_exchange),
      week = COALESCE(${stats.week !== undefined ? stats.week : null}, week),
      percent_gain = COALESCE(${stats.percent_gain !== undefined ? stats.percent_gain : null}, percent_gain),
      updated_at = NOW()
    WHERE id = 1 
    RETURNING *
  `
  return result[0] as JourneyStats
}

// Affiliate Click Tracking
export async function trackAffiliateClick(exchange: string, referralUrl: string): Promise<AffiliateClick> {
  const result = await sql`
    INSERT INTO affiliate_clicks (exchange, referral_url, clicked_at)
    VALUES (${exchange}, ${referralUrl}, NOW())
    RETURNING *
  `
  return result[0] as AffiliateClick
}

export async function getAffiliateStats(days: number = 30): Promise<AffiliateStats[]> {
  const result = await sql`
    SELECT 
      exchange,
      COUNT(*) as total_clicks,
      MAX(clicked_at) as last_click
    FROM affiliate_clicks
    WHERE clicked_at >= NOW() - INTERVAL '${days} days'
    GROUP BY exchange
    ORDER BY total_clicks DESC
  `
  return result as AffiliateStats[]
}

export async function getTopAffiliateClicks(limit: number = 10, days: number = 30): Promise<AffiliateStats[]> {
  const result = await sql`
    SELECT 
      exchange,
      COUNT(*) as total_clicks,
      MAX(clicked_at) as last_click
    FROM affiliate_clicks
    WHERE clicked_at >= NOW() - INTERVAL '${days} days'
    GROUP BY exchange
    ORDER BY total_clicks DESC
    LIMIT ${limit}
  `
  return result as AffiliateStats[]
}
