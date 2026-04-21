import { cookies } from 'next/headers'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'kifs123'

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export function createToken(username: string): string {
  // Create a simple token format: username|timestamp
  // We'll verify it by checking if the username matches the stored credentials
  const timestamp = Date.now()
  return `${username}|${timestamp}`
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('auth')
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('auth')?.value || null
}

export function verifyToken(token: string): { username: string } | null {
  if (!token) return null

  const parts = token.split('|')
  if (parts.length !== 2) return null

  const [username, timestamp] = parts
  const tokenTime = parseInt(timestamp)

  if (isNaN(tokenTime)) return null

  // Check if token is older than 7 days
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000
  if (Date.now() - tokenTime > sevenDaysMs) return null

  // Verify the username matches stored admin username
  if (username !== ADMIN_USERNAME) return null

  return { username }
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken()
  if (!token) return false
  return verifyToken(token) !== null
}
