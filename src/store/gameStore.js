import { create } from 'zustand'
import { getLettersByDifficulty, getRandomLetter, getLetterChoices } from '../data/letters'

/**
 * Global game state using Zustand
 */
export const useGameStore = create((set, get) => ({
  // Game state
  stars: 0,
  currentLetter: null,
  letterChoices: [],
  isProcessing: false,
  showVictory: false,
  
  // Settings
  settings: {
    numChoices: 3,
    difficulty: 'easy',
    soundEnabled: true,
    volume: 0.8,
  },
  
  // Actions
  startNewRound: () => {
    const { settings } = get()
    const availableLetters = getLettersByDifficulty(settings.difficulty)
    const targetLetter = getRandomLetter(availableLetters)
    const choices = getLetterChoices(targetLetter, settings.numChoices, availableLetters)
    
    set({ 
      currentLetter: targetLetter, 
      letterChoices: choices,
      isProcessing: false
    })
  },
  
  checkAnswer: (selectedLetter) => {
    const { currentLetter, stars, isProcessing } = get()
    
    // Prevent multiple clicks during animation
    if (isProcessing) {
      console.log('Already processing, ignoring click')
      return null
    }
    
    console.log('Checking answer:', {
      selected: selectedLetter.id,
      target: currentLetter.id,
      match: selectedLetter.id === currentLetter.id
    })
    
    set({ isProcessing: true })
    
    const isCorrect = selectedLetter.id === currentLetter.id
    const newStars = isCorrect 
      ? Math.min(stars + 1, 5) 
      : Math.max(stars - 1, 0)
    
    set({ stars: newStars })
    
    // Check for victory
    if (newStars >= 5) {
      setTimeout(() => {
        set({ showVictory: true })
      }, 5000) // Show victory after fan animation
    }
    
    return isCorrect
  },
  
  finishProcessing: () => {
    set({ isProcessing: false })
  },
  
  addStar: () => {
    set((state) => ({ 
      stars: Math.min(state.stars + 1, 5) 
    }))
  },
  
  removeStar: () => {
    set((state) => ({ 
      stars: Math.max(state.stars - 1, 0) 
    }))
  },
  
  resetGame: () => {
    set({ 
      stars: 0, 
      showVictory: false,
      isProcessing: false
    })
    get().startNewRound()
  },
  
  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    }))
  },
  
  // Initialize game
  initGame: () => {
    get().startNewRound()
  }
}))
