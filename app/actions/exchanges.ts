'use server'

import { revalidatePath } from 'next/cache'
import { neon } from '@neondatabase/serverless'
import {
  getExchanges,
  getExchangeById,
  createExchange,
  updateExchange,
  deleteExchange,
  type Exchange,
} from '@/lib/exchanges'

const sql = neon(process.env.DATABASE_URL!)

export async function getExchangesAction() {
  try {
    return await getExchanges()
  } catch (error) {
    console.error('[v0] Error fetching exchanges:', error)
    throw new Error('Failed to fetch exchanges')
  }
}

export async function getExchangeByIdAction(id: number) {
  try {
    return await getExchangeById(id)
  } catch (error) {
    console.error('[v0] Error fetching exchange:', error)
    throw new Error('Failed to fetch exchange')
  }
}

export async function createExchangeAction(data: Omit<Exchange, 'id' | 'created_at'>) {
  try {
    const exchange = await createExchange(data)
    revalidatePath('/exchanges')
    revalidatePath('/admin/exchanges')
    return exchange
  } catch (error) {
    console.error('[v0] Error creating exchange:', error)
    throw new Error('Failed to create exchange')
  }
}

export async function updateExchangeAction(
  id: number,
  data: Partial<Omit<Exchange, 'id' | 'created_at'>>
) {
  try {
    const exchange = await updateExchange(id, data)
    revalidatePath('/exchanges')
    revalidatePath('/admin/exchanges')
    return exchange
  } catch (error) {
    console.error('[v0] Error updating exchange:', error)
    throw new Error('Failed to update exchange')
  }
}

export async function deleteExchangeAction(id: number) {
  try {
    const success = await deleteExchange(id)
    if (success) {
      revalidatePath('/exchanges')
      revalidatePath('/admin/exchanges')
    }
    return success
  } catch (error) {
    console.error('[v0] Error deleting exchange:', error)
    throw new Error('Failed to delete exchange')
  }
}

// Sync exchanges from posts that haven't been added yet
export async function syncExchangesFromPostsAction() {
  try {
    // Get all unique exchanges from posts
    const posts = await sql`
      SELECT DISTINCT exchange FROM posts WHERE exchange IS NOT NULL
      ORDER BY exchange ASC
    `
    
    const postExchanges = posts.map((p: any) => p.exchange)
    console.log('[v0] Found exchanges in posts:', postExchanges)

    // Get existing exchanges
    const existing = await getExchanges()
    const existingNames = new Set(existing.map(e => e.name))
    
    // Add missing exchanges
    for (const exchangeName of postExchanges) {
      if (!existingNames.has(exchangeName)) {
        console.log('[v0] Adding new exchange from posts:', exchangeName)
        await createExchange({
          name: exchangeName,
          slug: exchangeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          description: null,
          bonus_amount: null,
          bonus_type: null,
          difficulty: 'Medium',
          status: 'Active Now',
          week_claimed: null,
          referral_link: null,
          logo_url: null,
          sort_order: existing.length,
        })
      }
    }

    revalidatePath('/exchanges')
    revalidatePath('/admin/exchanges')
    
    return { synced: true, count: postExchanges.length }
  } catch (error) {
    console.error('[v0] Error syncing exchanges:', error)
    throw new Error('Failed to sync exchanges from posts')
  }
}
