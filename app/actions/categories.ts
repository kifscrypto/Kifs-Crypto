'use server'

import { revalidatePath } from 'next/cache'
import {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  type Category,
} from '@/lib/categories'

export async function getCategoriesAction() {
  try {
    return await getCategories()
  } catch (error) {
    console.error('[v0] Error fetching categories:', error)
    throw new Error('Failed to fetch categories')
  }
}

export async function getCategoryByIdAction(id: number) {
  try {
    return await getCategoryById(id)
  } catch (error) {
    console.error('[v0] Error fetching category:', error)
    throw new Error('Failed to fetch category')
  }
}

export async function getCategoryBySlugAction(slug: string) {
  try {
    return await getCategoryBySlug(slug)
  } catch (error) {
    console.error('[v0] Error fetching category:', error)
    throw new Error('Failed to fetch category')
  }
}

export async function createCategoryAction(data: Omit<Category, 'id' | 'created_at'>) {
  try {
    const category = await createCategory(data)
    revalidatePath('/blog')
    revalidatePath('/admin/categories')
    return category
  } catch (error) {
    console.error('[v0] Error creating category:', error)
    throw new Error('Failed to create category')
  }
}

export async function updateCategoryAction(
  id: number,
  data: Partial<Omit<Category, 'id' | 'created_at'>>
) {
  try {
    const category = await updateCategory(id, data)
    revalidatePath('/blog')
    revalidatePath('/admin/categories')
    return category
  } catch (error) {
    console.error('[v0] Error updating category:', error)
    throw new Error('Failed to update category')
  }
}

export async function deleteCategoryAction(id: number) {
  try {
    await deleteCategory(id)
    revalidatePath('/blog')
    revalidatePath('/admin/categories')
  } catch (error) {
    console.error('[v0] Error deleting category:', error)
    throw new Error('Failed to delete category')
  }
}
