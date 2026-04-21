import { Metadata } from 'next'
import AdminLoginForm from '@/components/admin-login-form'

export const metadata: Metadata = {
  title: 'Admin Login - KIFS Crypto',
  robots: 'noindex, nofollow',
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-[#f0f0f0]">KIFS Admin</h1>
            <p className="text-[#9ca3af]">Manage your trading journey</p>
          </div>
          
          <AdminLoginForm />
        </div>
      </div>
    </div>
  )
}
