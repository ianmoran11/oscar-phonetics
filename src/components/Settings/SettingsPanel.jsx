import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { letters, getLettersByDifficulty } from '../../data/letters'
import './SettingsPanel.css'

function SettingsPanel({ onClose }) {
  const { settings, updateSettings, resetGame } = useGameStore()
  const [showLetterSelector, setShowLetterSelector] = useState(false)
  
  // Get available letters based on current difficulty
  const availableLetters = getLettersByDifficulty(settings.difficulty)
  
  // Initialize enabled letters if null
  const enabledLetters = settings.enabledLetters || availableLetters.map(l => l.id)

  const handleNumChoicesChange = (e) => {
    updateSettings({ numChoices: parseInt(e.target.value) })
  }

  const handleDifficultyChange = (e) => {
    updateSettings({ difficulty: e.target.value })
  }

  const handleVolumeChange = (e) => {
    updateSettings({ volume: parseFloat(e.target.value) })
  }

  const handleSoundToggle = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled })
  }

  const handleReset = () => {
    resetGame()
    onClose()
  }
  
  const toggleLetter = (letterId) => {
    const currentEnabled = settings.enabledLetters || availableLetters.map(l => l.id)
    
    if (currentEnabled.includes(letterId)) {
      // Remove letter (but keep at least 3 letters)
      const newEnabled = currentEnabled.filter(id => id !== letterId)
      if (newEnabled.length >= settings.numChoices) {
        updateSettings({ enabledLetters: newEnabled })
      } else {
        alert(`You must have at least ${settings.numChoices} letters enabled!`)
      }
    } else {
      // Add letter
      updateSettings({ enabledLetters: [...currentEnabled, letterId] })
    }
  }
  
  const selectAllLetters = () => {
    updateSettings({ enabledLetters: null }) // null means all letters
  }
  
  const deselectAllLetters = () => {
    // Keep only the first few letters to meet minimum requirement
    const minLetters = availableLetters.slice(0, settings.numChoices).map(l => l.id)
    updateSettings({ enabledLetters: minLetters })
  }
  
  const isLetterEnabled = (letterId) => {
    if (!settings.enabledLetters) return true // null means all enabled
    return settings.enabledLetters.includes(letterId)
  }

  return (
    <motion.div
      className="settings-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="settings-panel"
        initial={{ scale: 0.8, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: -50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="settings-header">
          <h2>⚙️ Settings</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="settings-content">
          {/* Number of Choices */}
          <div className="setting-item">
            <label htmlFor="num-choices">Number of Letter Choices</label>
            <div className="setting-control">
              <input
                id="num-choices"
                type="range"
                min="2"
                max="5"
                value={settings.numChoices}
                onChange={handleNumChoicesChange}
              />
              <span className="setting-value">{settings.numChoices}</span>
            </div>
          </div>

          {/* Difficulty */}
          <div className="setting-item">
            <label htmlFor="difficulty">Difficulty Level</label>
            <select
              id="difficulty"
              value={settings.difficulty}
              onChange={handleDifficultyChange}
              className="setting-select"
            >
              <option value="easy">Easy (Basic Letters)</option>
              <option value="medium">Medium (More Letters)</option>
              <option value="hard">Hard (All Letters)</option>
            </select>
          </div>

          {/* Sound Toggle */}
          <div className="setting-item">
            <label htmlFor="sound-enabled">Sound Effects</label>
            <div className="setting-control">
              <button
                id="sound-enabled"
                className={`toggle-button ${settings.soundEnabled ? 'active' : ''}`}
                onClick={handleSoundToggle}
              >
                {settings.soundEnabled ? '🔊 ON' : '🔇 OFF'}
              </button>
            </div>
          </div>

          {/* Volume */}
          {settings.soundEnabled && (
            <div className="setting-item">
              <label htmlFor="volume">Volume</label>
              <div className="setting-control">
                <input
                  id="volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.volume}
                  onChange={handleVolumeChange}
                />
                <span className="setting-value">{Math.round(settings.volume * 100)}%</span>
              </div>
            </div>
          )}

          {/* Letter Selection */}
          <div className="setting-item">
            <label>Choose Letters to Practice</label>
            <button 
              className="toggle-button"
              onClick={() => setShowLetterSelector(!showLetterSelector)}
            >
              {showLetterSelector ? '▼ Hide Letters' : '▶ Select Letters'}
            </button>
          </div>

          {/* Letter Selector Grid */}
          {showLetterSelector && (
            <div className="letter-selector">
              <div className="letter-selector-actions">
                <button 
                  className="select-all-button"
                  onClick={selectAllLetters}
                >
                  ✓ Select All
                </button>
                <button 
                  className="deselect-all-button"
                  onClick={deselectAllLetters}
                >
                  ✕ Deselect All
                </button>
              </div>
              
              <div className="letter-grid-selector">
                {availableLetters.map((letter) => (
                  <button
                    key={letter.id}
                    className={`letter-tile ${
                      isLetterEnabled(letter.id) ? 'enabled' : 'disabled'
                    }`}
                    style={{
                      backgroundColor: isLetterEnabled(letter.id) 
                        ? letter.color 
                        : '#ccc'
                    }}
                    onClick={() => toggleLetter(letter.id)}
                  >
                    <span className="letter-tile-symbol">{letter.symbol}</span>
                    {isLetterEnabled(letter.id) && (
                      <span className="letter-tile-check">✓</span>
                    )}
                  </button>
                ))}
              </div>
              
              <p className="letter-selector-info">
                {settings.enabledLetters 
                  ? `${settings.enabledLetters.length} letters selected`
                  : `All ${availableLetters.length} letters selected`
                }
              </p>
            </div>
          )}

          {/* Reset Game */}
          <div className="setting-item">
            <button className="reset-button" onClick={handleReset}>
              🔄 Reset Game
            </button>
          </div>
        </div>

        <div className="settings-footer">
          <p className="settings-note">
            💡 Tip: Start with Easy mode and 3 choices for young learners
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SettingsPanel
