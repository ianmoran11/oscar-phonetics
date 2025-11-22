import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getAllLetters, getRandomLetter, getLetterChoices } from '../data/letters'

/**
 * Global game state using Zustand
 */
export const useGameStore = create(
  persist(
    (set, get) => ({
      // Game state
      stars: 0,
      currentLetter: null,
      letterChoices: [],
      isProcessing: false,
      showVictory: false,
      
      // Settings
      settings: {
        numChoices: 3,
        soundEnabled: true,
        volume: 0.8,
        enabledLetters: null, // null means use all letters
        starsForVictory: 5, // Number of stars needed to win (1-10)
      },

      // Statistics
      stats: {
        history: [] // { timestamp, targetLetterId, selectedLetterId, isCorrect, distractors[] }
      },
      
      // Actions
      startNewRound: () => {
        const { settings } = get()
        let availableLetters = getAllLetters()
        
        // Filter by enabled letters if custom selection is active
        if (settings.enabledLetters && settings.enabledLetters.length > 0) {
          availableLetters = availableLetters.filter(letter => 
            settings.enabledLetters.includes(letter.id)
          )
        }
        
        // Make sure we have enough letters
        if (availableLetters.length < settings.numChoices) {
          console.warn('Not enough enabled letters, using all available')
          availableLetters = getAllLetters()
        }
        
        const targetLetter = getRandomLetter(availableLetters)
        const choices = getLetterChoices(targetLetter, settings.numChoices, availableLetters)
        
        set({ 
          currentLetter: targetLetter, 
          letterChoices: choices,
          isProcessing: false
        })
      },
      
      checkAnswer: (selectedLetter) => {
        const { currentLetter, stars, isProcessing, settings, letterChoices } = get()
        
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
        
        const isCorrect = selectedLetter.id === currentLetter.id

        // Record statistic
        set((state) => {
          const newHistory = [
            ...state.stats.history,
            {
              timestamp: Date.now(),
              targetLetterId: currentLetter.id,
              selectedLetterId: selectedLetter.id,
              isCorrect,
              distractors: letterChoices
                .filter(l => l.id !== currentLetter.id)
                .map(l => l.id)
            }
          ]
          return { stats: { ...state.stats, history: newHistory } }
        })
        
        set({ isProcessing: true })
        
        const { starsForVictory } = settings
        const newStars = isCorrect 
          ? Math.min(stars + 1, starsForVictory) 
          : Math.max(stars - 1, 0)
        
        set({ stars: newStars })
        
        // Check for victory
        if (newStars >= starsForVictory) {
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
          stars: Math.min(state.stars + 1, state.settings.starsForVictory) 
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

      clearStats: () => {
        set({ stats: { history: [] } })
      },
      
      // Initialize game
      initGame: () => {
        get().startNewRound()
      }
    }),
    {
      name: 'letter-sound-game-storage', // unique name
      partialize: (state) => ({ 
        settings: state.settings,
        stats: state.stats 
      }), // only persist settings and stats
    }
  )
)
