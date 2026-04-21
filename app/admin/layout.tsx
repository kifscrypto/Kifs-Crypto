import { ReactNode } from 'react'
import AdminNav from '@/components/admin-nav'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#080808]">
      <AdminNav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
