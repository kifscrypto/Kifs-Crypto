import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import AdminNav from '@/components/admin-nav'
import { isAuthenticated } from '@/lib/auth'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-[#080808]">
      <AdminNav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
