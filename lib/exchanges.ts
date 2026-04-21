import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export interface Exchange {
  id: number
  name: string
  slug: string
  description: string | null
  bonus_amount: string | null
  bonus_type: string | null
  difficulty: 'Easy' | 'Medium' | 'Hard'
  status: 'Claimed' | 'Active Now' | 'Coming Soon'
  week_claimed: string | null
  referral_link: string | null
  logo_url: string | null
  sort_order: number
  created_at: string
}

export async function getExchanges(): Promise<Exchange[]> {
  const exchanges = await sql`
    SELECT * FROM exchanges 
    ORDER BY sort_order ASC
  `
  return exchanges as Exchange[]
}

export async function getExchangeById(id: number): Promise<Exchange | null> {
  const result = await sql`
    SELECT * FROM exchanges 
    WHERE id = ${id}
  `
  return result.length > 0 ? (result[0] as Exchange) : null
}

export async function createExchange(data: Omit<Exchange, 'id' | 'created_at'>): Promise<Exchange> {
  const result = await sql`
    INSERT INTO exchanges (
      name, 
      slug, 
      description, 
      bonus_amount, 
      bonus_type, 
      difficulty, 
      status, 
      week_claimed, 
      referral_link, 
      logo_url, 
      sort_order
    )
    VALUES (
      ${data.name},
      ${data.slug},
      ${data.description},
      ${data.bonus_amount},
      ${data.bonus_type},
      ${data.difficulty},
      ${data.status},
      ${data.week_claimed},
      ${data.referral_link},
      ${data.logo_url},
      ${data.sort_order}
    )
    RETURNING *
  `
  return result[0] as Exchange
}

export async function updateExchange(id: number, data: Partial<Omit<Exchange, 'id' | 'created_at'>>): Promise<Exchange> {
  const result = await sql`
    UPDATE exchanges
    SET
      name = ${data.name ?? null},
      slug = ${data.slug ?? null},
      description = ${data.description ?? null},
      bonus_amount = ${data.bonus_amount ?? null},
      bonus_type = ${data.bonus_type ?? null},
      difficulty = ${data.difficulty ?? null},
      status = ${data.status ?? null},
      week_claimed = ${data.week_claimed ?? null},
      referral_link = ${data.referral_link ?? null},
      logo_url = ${data.logo_url ?? null},
      sort_order = ${data.sort_order ?? null}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0] as Exchange
}

export async function deleteExchange(id: number): Promise<boolean> {
  const result = await sql`
    DELETE FROM exchanges 
    WHERE id = ${id}
  `
  return result.count > 0
}
