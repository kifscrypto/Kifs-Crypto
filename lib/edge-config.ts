// Edge Config setup for storing the current challenge balance
// This file contains helper functions to use Vercel Edge Config
// Edge Config provides near-zero latency global reads for frequently accessed data

import { get, getAll } from '@vercel/edge-config'

interface ChallengeState {
  currentBalance: number
  targetBalance: number
  startingBalance: number
  week: number
  currentExchange: string
  percentGain: number
  lastUpdated: string
}

const EDGE_CONFIG_KEY = 'challenge_state'

/**
 * Get the current challenge state from Edge Config
 * Falls back to hardcoded defaults if Edge Config is unavailable
 */
export async function getChallengeState(): Promise<ChallengeState> {
  try {
    const state = await get<ChallengeState>(EDGE_CONFIG_KEY)
    
    if (state) {
      return state
    }
  } catch (error) {
    console.warn('[v0] Edge Config unavailable, using defaults:', error)
  }

  // Fallback defaults
  return {
    currentBalance: 1247.50,
    targetBalance: 1000000,
    startingBalance: 1000,
    week: 2,
    currentExchange: 'BYDFi',
    percentGain: 24.75,
    lastUpdated: new Date().toISOString(),
  }
}

/**
 * Get all Edge Config data (for debugging)
 */
export async function getAllChallengeData() {
  try {
    return await getAll()
  } catch (error) {
    console.warn('[v0] Failed to get all Edge Config data:', error)
    return {}
  }
}
