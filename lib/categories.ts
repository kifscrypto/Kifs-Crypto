import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  created_at: string
}

export async function getCategories(): Promise<Category[]> {
  const categories = await sql`
    SELECT * FROM categories
    ORDER BY name ASC
  `
  return categories as Category[]
}

export async function getCategoryById(id: number): Promise<Category | null> {
  const result = await sql`
    SELECT * FROM categories
    WHERE id = ${id}
    LIMIT 1
  `
  return result.length > 0 ? (result[0] as Category) : null
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const result = await sql`
    SELECT * FROM categories
    WHERE slug = ${slug}
    LIMIT 1
  `
  return result.length > 0 ? (result[0] as Category) : null
}

export async function createCategory(
  data: Omit<Category, 'id' | 'created_at'>
): Promise<Category> {
  const result = await sql`
    INSERT INTO categories (name, slug, description)
    VALUES (${data.name}, ${data.slug}, ${data.description})
    RETURNING *
  `
  return result[0] as Category
}

export async function updateCategory(
  id: number,
  data: Partial<Omit<Category, 'id' | 'created_at'>>
): Promise<Category> {
  const result = await sql`
    UPDATE categories
    SET
      name = COALESCE(${data.name || null}, name),
      slug = COALESCE(${data.slug || null}, slug),
      description = COALESCE(${data.description || null}, description)
    WHERE id = ${id}
    RETURNING *
  `
  return result[0] as Category
}

export async function deleteCategory(id: number): Promise<void> {
  await sql`
    DELETE FROM categories
    WHERE id = ${id}
  `
}
