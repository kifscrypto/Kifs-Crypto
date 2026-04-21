import { NextRequest, NextResponse } from 'next/server'
import { getJourneyStats, updateJourneyStats } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET(req: NextRequest) {
  try {
    const stats = await getJourneyStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching journey stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch journey stats' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      console.log('[v0] Journey stats update - unauthorized')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    console.log('[v0] Updating journey stats:', body)

    const stats = await updateJourneyStats(body)
    
    console.log('[v0] Journey stats updated successfully:', stats)
    
    // Revalidate homepage to update tracker
    revalidatePath('/')
    revalidatePath('/blog')
    revalidatePath('/admin/journey-stats')

    return NextResponse.json(stats)
  } catch (error) {
    console.error('[v0] Error updating journey stats:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update journey stats' },
      { status: 500 }
    )
  }
}
