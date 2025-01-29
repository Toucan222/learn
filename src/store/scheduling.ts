import { create } from 'zustand'
import { SchedulingSuggestion, SchedulingRequest } from '@/components/scheduling/types'

interface SchedulingState {
  suggestions: SchedulingSuggestion[]
  selectedSuggestion: SchedulingSuggestion | null
  request: SchedulingRequest | null
  setSuggestions: (suggestions: SchedulingSuggestion[]) => void
  setSelectedSuggestion: (suggestion: SchedulingSuggestion | null) => void
  setRequest: (request: SchedulingRequest | null) => void
}

export const useSchedulingStore = create<SchedulingState>((set) => ({
  suggestions: [],
  selectedSuggestion: null,
  request: null,
  setSuggestions: (suggestions) => set({ suggestions }),
  setSelectedSuggestion: (selectedSuggestion) => set({ selectedSuggestion }),
  setRequest: (request) => set({ request }),
}))
