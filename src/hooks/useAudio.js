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
    
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    
    // Create and play new audio
    audioRef.current = new Audio(soundFile)
    audioRef.current.volume = settings.volume
    
    audioRef.current.play().catch(error => {
      console.error('Audio playback failed:', error)
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
