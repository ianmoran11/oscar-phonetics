import { useState } from 'react'
import GameBoard from './components/Game/GameBoard'
import SettingsPanel from './components/Settings/SettingsPanel'
import StatisticsPanel from './components/Statistics/StatisticsPanel'
import VictoryScreen from './components/Game/VictoryScreen'
import { useGameStore } from './store/gameStore'
import './App.css'

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const { stars, showVictory, resetGame } = useGameStore()

  const handlePlayAgain = () => {
    resetGame()
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🔤 Letter Sounds</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="settings-button"
            onClick={() => setShowStats(true)}
            aria-label="Statistics"
            title="View Statistics"
          >
            📊
          </button>
          <button 
            className="settings-button"
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Settings"
             title="Settings"
          >
            ⚙️
          </button>
        </div>
      </header>

      <main className="app-main">
        {showVictory ? (
          <VictoryScreen onPlayAgain={handlePlayAgain} />
        ) : (
          <GameBoard />
        )}
      </main>

      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}

      {showStats && (
        <StatisticsPanel onClose={() => setShowStats(false)} />
      )}
    </div>
  )
}

export default App
