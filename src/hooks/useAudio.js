import { useRef, useCallback } from 'react'
import { useGameStore } from '../store/gameStore'

/**
 * Custom hook for audio playback with volume control
 */
export function useAudio() {
  const audioRef = useRef(null)
  const settings = useGameStore((state) => state.settings)
  
  const play = useCallback((soundFile) => {
    if (!settings.soundEnabled) return
    if (!settings.soundEnabled) {
      console.log('Sound is disabled in settings')
      return
    }
    
    console.log('Attempting to play:', soundFile)
    
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    
    // Create and play new audio
    audioRef.current = new Audio(soundFile)
    audioRef.current.volume = settings.volume
    


    // Add error handling for file loading
    audioRef.current.addEventListener('error', (e) => {
      console.error('Audio file failed to load:', soundFile, e)
      alert(`Audio file not found: ${soundFile}\n\nPlease add audio files to public/sounds/phonemes/`)
    })
    
    audioRef.current.addEventListener('canplaythrough', () => {
      console.log('Audio loaded successfully:', soundFile)
    })
    
    audioRef.current.play()
      .then(() => {
        console.log('Audio playing:', soundFile)
      })
      .catch(error => {
        console.error('Audio playback failed:', error)
        // If autoplay is blocked, show user-friendly message
        if (error.name === 'NotAllowedError') {
          console.warn('Autoplay blocked. User interaction required.')
        }
      })
  }, [settings.soundEnabled, settings.volume])
  
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [])
  
  return { play, stop }
}

/**
 * Preload audio files for better performance
 */
export function useAudioPreload(soundFiles) {
  const audioCache = useRef({})
  
  const preload = useCallback(() => {
    soundFiles.forEach(file => {
      if (!audioCache.current[file]) {
        const audio = new Audio(file)
        audio.preload = 'auto'
        audioCache.current[file] = audio
      }
    })
  }, [soundFiles])
  
  return { preload, audioCache }
}
