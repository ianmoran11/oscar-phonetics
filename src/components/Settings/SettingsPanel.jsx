import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import './SettingsPanel.css'

function SettingsPanel({ onClose }) {
  const { settings, updateSettings, resetGame } = useGameStore()

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
