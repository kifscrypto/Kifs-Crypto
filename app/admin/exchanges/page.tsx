'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  getExchangesAction,
  createExchangeAction,
  updateExchangeAction,
  deleteExchangeAction,
  syncExchangesFromPostsAction,
} from '@/app/actions/exchanges'

interface Exchange {
  id: number
  name: string
  slug: string
  description: string
  bonus_amount: string
  bonus_type: string
  difficulty: string
  status: string
  week_claimed: string | null
  referral_link: string
  logo_url: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

interface FormData {
  name: string
  slug: string
  description: string
  bonus_amount: string
  bonus_type: string
  difficulty: string
  status: string
  week_claimed: string
  referral_link: string
  logo_url: string
  sort_order: number
}

const initialFormData: FormData = {
  name: '',
  slug: '',
  description: '',
  bonus_amount: '',
  bonus_type: '',
  difficulty: 'Medium',
  status: 'Active Now',
  week_claimed: '',
  referral_link: '',
  logo_url: '',
  sort_order: 0,
}

export default function ExchangesPage() {
  const [exchanges, setExchanges] = useState<Exchange[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [syncing, setSyncing] = useState(false)

  // Load exchanges
  useEffect(() => {
    loadExchanges()
  }, [])

  async function loadExchanges() {
    try {
      console.log('[v0] Loading exchanges...')
      const data = await getExchangesAction()
      console.log('[v0] Exchanges loaded:', data)
      setExchanges(data || [])
    } catch (error) {
      console.error('[v0] Failed to load exchanges:', error)
      setMessage({ type: 'error', text: 'Failed to load exchanges. Make sure the database migration has run.' })
      setExchanges([])
    } finally {
      setLoading(false)
    }
  }

  // Auto-generate slug from name
  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function handleNameChange(value: string) {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: generateSlug(value),
    }))
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'sort_order' ? parseInt(value) || 0 : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

      try {
        if (editingId) {
          await updateExchangeAction(editingId, formData)
          setMessage({ type: 'success', text: 'Bonus updated successfully' })
        } else {
          await createExchangeAction(formData)
          setMessage({ type: 'success', text: 'Bonus created successfully' })
        }

      setShowForm(false)
      setEditingId(null)
      setFormData(initialFormData)
      loadExchanges()
      } catch (error) {
        console.error('Error saving bonus:', error)
        setMessage({ type: 'error', text: 'Failed to save bonus' })
      }
  }

  async function handleEdit(exchange: Exchange) {
    setFormData({
      name: exchange.name,
      slug: exchange.slug,
      description: exchange.description,
      bonus_amount: exchange.bonus_amount,
      bonus_type: exchange.bonus_type,
      difficulty: exchange.difficulty,
      status: exchange.status,
      week_claimed: exchange.week_claimed || '',
      referral_link: exchange.referral_link,
      logo_url: exchange.logo_url || '',
      sort_order: exchange.sort_order,
    })
    setEditingId(exchange.id)
    setShowForm(true)
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Are you sure you want to delete this bonus?')) return

    setDeleting(id)
    try {
      await deleteExchangeAction(id)
      setMessage({ type: 'success', text: 'Bonus deleted successfully' })
      loadExchanges()
    } catch (error) {
      console.error('Failed to delete bonus:', error)
      setMessage({ type: 'error', text: 'Failed to delete bonus' })
    } finally {
      setDeleting(null)
    }
  }

  async function handleSyncExchanges() {
    setSyncing(true)
    try {
      await syncExchangesFromPostsAction()
      setMessage({ type: 'success', text: 'Exchanges synced from posts successfully' })
      loadExchanges()
    } catch (error) {
      console.error('Failed to sync exchanges:', error)
      setMessage({ type: 'error', text: 'Failed to sync exchanges from posts' })
    } finally {
      setSyncing(false)
    }
  }

  function handleCancel() {
    setShowForm(false)
    setEditingId(null)
    setFormData(initialFormData)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-[#1f2937] rounded-lg" />
          <div className="h-64 bg-[#1f2937] rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#f0f0f0]">Bonuses</h1>
            <p className="text-[#9ca3af]">Manage your bonus list</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSyncExchanges}
              disabled={syncing}
              className="px-6 py-3 bg-[#4B5563] text-[#f0f0f0] font-semibold rounded-lg hover:bg-[#5a6574] transition-colors disabled:opacity-50"
            >
              {syncing ? 'Syncing...' : 'Sync from Posts'}
            </button>
            <button
              onClick={() => {
                setShowForm(!showForm)
                if (showForm) handleCancel()
              }}
              className="px-6 py-3 bg-[#FFA500] text-[#080808] font-semibold rounded-lg hover:bg-[#FFB800] transition-colors"
            >
              {showForm ? 'Cancel' : 'New Bonus'}
            </button>
          </div>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                : 'bg-red-500/10 border border-red-500/30 text-red-400'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-8 space-y-6">
            <h2 className="text-xl font-bold text-[#f0f0f0]">
              {editingId ? 'Edit Bonus' : 'Add New Bonus'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none"
                    placeholder="e.g., Binance"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                    Slug (auto-generated)
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    readOnly
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#6b7280] cursor-not-allowed"
                  />
                </div>

                {/* Bonus Amount */}
                <div>
                  <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                    Bonus Amount *
                  </label>
                  <input
                    type="text"
                    name="bonus_amount"
                    value={formData.bonus_amount}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none"
                    placeholder="e.g., $5,000"
                  />
                </div>

                {/* Bonus Type */}
                <div>
                  <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                    Bonus Type *
                  </label>
                  <input
                    type="text"
                    name="bonus_type"
                    value={formData.bonus_type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none"
                    placeholder="e.g., Sign-up Bonus"
                  />
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                    Difficulty *
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f0f0f0] focus:border-[#FFA500] focus:outline-none"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f0f0f0] focus:border-[#FFA500] focus:outline-none"
                  >
                    <option>Claimed</option>
                    <option>Active Now</option>
                    <option>Coming Soon</option>
                  </select>
                </div>

                {/* Week Claimed */}
                <div>
                  <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                    Week Claimed
                  </label>
                  <input
                    type="text"
                    name="week_claimed"
                    value={formData.week_claimed}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none"
                    placeholder="e.g., Week 1"
                  />
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    name="sort_order"
                    value={formData.sort_order}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f0f0f0] focus:border-[#FFA500] focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none resize-none"
                  placeholder="Exchange details..."
                />
              </div>

              {/* Referral Link */}
              <div>
                <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                  Referral Link *
                </label>
                <input
                  type="url"
                  name="referral_link"
                  value={formData.referral_link}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none"
                  placeholder="https://..."
                />
              </div>

              {/* Logo URL */}
              <div>
                <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                  Logo URL
                </label>
                <input
                  type="url"
                  name="logo_url"
                  value={formData.logo_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none"
                  placeholder="https://..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#FFA500] text-[#080808] font-semibold rounded-lg hover:bg-[#FFB800] transition-colors"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-[#2a2a2a] text-[#9ca3af] rounded-lg hover:bg-[#1a1a1a] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Exchanges Table */}
        {exchanges.length > 0 ? (
          <div className="overflow-x-auto bg-[#0d0d0d] border border-[#1f2937] rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f2937]">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#f0f0f0]">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#f0f0f0]">
                    Bonus
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#f0f0f0]">
                    Difficulty
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#f0f0f0]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#f0f0f0]">
                    Sort
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#f0f0f0]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {exchanges
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map((exchange) => (
                    <tr key={exchange.id} className="border-b border-[#1f2937] hover:bg-[#1a1a1a] transition-colors">
                      <td className="px-6 py-4 text-sm text-[#f0f0f0]">{exchange.name}</td>
                      <td className="px-6 py-4 text-sm text-[#9ca3af]">{exchange.bonus_amount}</td>
                      <td className="px-6 py-4 text-sm text-[#9ca3af]">{exchange.difficulty}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            exchange.status === 'Claimed'
                              ? 'bg-green-500/20 text-green-400'
                              : exchange.status === 'Active Now'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {exchange.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#9ca3af]">{exchange.sort_order}</td>
                      <td className="px-6 py-4 text-right text-sm space-x-3 flex justify-end">
                        <button
                          onClick={() => handleEdit(exchange)}
                          className="text-[#FFA500] hover:text-[#FFB800] transition-colors font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(exchange.id)}
                          disabled={deleting === exchange.id}
                          className="text-[#FF3333] hover:text-[#dc2626] transition-colors font-medium disabled:opacity-50"
                        >
                          {deleting === exchange.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-12 text-center">
            <p className="text-[#9ca3af] mb-4">No bonuses yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-[#FFA500] text-[#080808] font-semibold rounded-lg hover:bg-[#FFB800] transition-colors"
            >
              Add First Bonus
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
