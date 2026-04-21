'use server'

import { revalidatePath } from 'next/cache'
import {
  getExchanges,
  getExchangeById,
  createExchange,
  updateExchange,
  deleteExchange,
  type Exchange,
} from '@/lib/exchanges'

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
