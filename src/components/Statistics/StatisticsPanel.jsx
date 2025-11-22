import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { getAllLetters } from '../../data/letters'
import './StatisticsPanel.css'

function StatisticsPanel({ onClose }) {
  const { stats, clearStats } = useGameStore()
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [filter, setFilter] = useState('all') // 'all', 'weak', 'strong'
  
  const allLetters = getAllLetters()

  // Process statistics data
  const data = useMemo(() => {
    const history = stats.history || []
    const letterStats = {}
    
    // Initialize stats for all letters
    allLetters.forEach(l => {
      letterStats[l.id] = {
        ...l,
        attempts: 0,
        successes: 0,
        failures: 0,
        confusions: {}, // { confuseWithId: count }
        history: [], // [true, false, true...]
      }
    })

    // Aggregate history
    history.forEach(entry => {
      const { targetLetterId, selectedLetterId, isCorrect, timestamp } = entry
      
      if (letterStats[targetLetterId]) {
        const stat = letterStats[targetLetterId]
        stat.attempts++
        stat.history.push({ isCorrect, timestamp })
        
        if (isCorrect) {
          stat.successes++
        } else {
          stat.failures++
          // Track what it was confused with
          if (selectedLetterId) {
            stat.confusions[selectedLetterId] = (stat.confusions[selectedLetterId] || 0) + 1
          }
        }
      }
    })

    // Calculate accuracy
    Object.values(letterStats).forEach(stat => {
      stat.accuracy = stat.attempts > 0 
        ? Math.round((stat.successes / stat.attempts) * 100) 
        : 0
    })

    const totalAttempts = history.length
    const totalSuccesses = history.filter(h => h.isCorrect).length
    const globalAccuracy = totalAttempts > 0 
      ? Math.round((totalSuccesses / totalAttempts) * 100) 
      : 0

    return {
      letterStats,
      totalAttempts,
      globalAccuracy,
      hasData: totalAttempts > 0
    }
  }, [stats.history])

  // Helper to determine color based on accuracy
  const getAccuracyColor = (accuracy, attempts) => {
    if (attempts === 0) return '#bdc3c7' // grey
    if (accuracy >= 80) return '#2ecc71' // green
    if (accuracy >= 50) return '#f1c40f' // yellow
    return '#e74c3c' // red
  }

  // Filter letters for grid
  const displayedLetters = allLetters.filter(l => {
    const stat = data.letterStats[l.id]
    if (filter === 'all') return true
    if (filter === 'played') return stat.attempts > 0
    if (filter === 'weak') return stat.attempts > 0 && stat.accuracy < 60
    if (filter === 'strong') return stat.attempts > 0 && stat.accuracy >= 80
    return true
  })

  // Get top confusions for selected letter
  const getTopConfusions = (letterId) => {
    const stat = data.letterStats[letterId]
    if (!stat || !stat.confusions) return []
    
    return Object.entries(stat.confusions)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([id, count]) => {
        const letter = allLetters.find(l => l.id === id)
        return { letter, count, percent: Math.round((count / stat.failures) * 100) }
      })
  }

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all progress history? This cannot be undone.')) {
      clearStats()
      setSelectedLetter(null)
    }
  }

  return (
    <motion.div
      className="stats-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="stats-panel"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="stats-header">
          <h2>📊 Progress Statistics</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="stats-content">
          {!data.hasData ? (
            <div className="no-data">
              <p>No games played yet!</p>
              <p>Play some rounds to see your progress here.</p>
            </div>
          ) : (
            <>
              {/* Summary Cards */}
              <div className="stats-summary">
                <div className="summary-card">
                  <span className="summary-value">{data.totalAttempts}</span>
                  <span className="summary-label">Total Rounds</span>
                </div>
                <div className="summary-card">
                  <span className="summary-value" style={{ color: getAccuracyColor(data.globalAccuracy, 1) }}>
                    {data.globalAccuracy}%
                  </span>
                  <span className="summary-label">Overall Accuracy</span>
                </div>
              </div>

              {/* Filters */}
              <div className="stats-filters">
                <button 
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All Letters
                </button>
                <button 
                  className={`filter-btn ${filter === 'played' ? 'active' : ''}`}
                  onClick={() => setFilter('played')}
                >
                  Played Only
                </button>
                <button 
                  className={`filter-btn ${filter === 'weak' ? 'active' : ''}`}
                  onClick={() => setFilter('weak')}
                >
                  Needs Practice
                </button>
                <button 
                  className={`filter-btn ${filter === 'strong' ? 'active' : ''}`}
                  onClick={() => setFilter('strong')}
                >
                  Mastered
                </button>
              </div>

              {/* Letter Grid */}
              <div className="stats-letter-grid">
                {displayedLetters.map(letter => {
                  const stat = data.letterStats[letter.id]
                  const bgColor = getAccuracyColor(stat.accuracy, stat.attempts)
                  const isSelected = selectedLetter && selectedLetter.id === letter.id
                  
                  return (
                    <div
                      key={letter.id}
                      className="stat-letter-card"
                      style={{ 
                        backgroundColor: isSelected ? '#34495e' : `${bgColor}20`,
                        borderColor: bgColor,
                        transform: isSelected ? 'scale(1.05)' : 'none'
                      }}
                      onClick={() => setSelectedLetter(letter)}
                    >
                      <span className="stat-letter-symbol" style={{ color: isSelected ? 'white' : '#2c3e50' }}>{letter.symbol}</span>
                      {stat.attempts > 0 && (
                        <>
                          <span className="stat-letter-accuracy" style={{ color: bgColor }}>{stat.accuracy}%</span>
                          <span className="stat-letter-count">{stat.attempts}</span>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Detailed View */}
              {selectedLetter && data.letterStats[selectedLetter.id].attempts > 0 && (
                <div className="letter-detail-view">
                  <div className="letter-detail-header">
                    <div className="detail-symbol" style={{ color: selectedLetter.color }}>
                      {selectedLetter.symbol}
                    </div>
                    <div className="detail-info">
                      <h3>Letter {selectedLetter.symbol} Performance</h3>
                      <div className="detail-stats">
                        <span>Attempts: <strong>{data.letterStats[selectedLetter.id].attempts}</strong></span>
                        <span>Success: <strong>{data.letterStats[selectedLetter.id].successes}</strong></span>
                        <span>Accuracy: <strong>{data.letterStats[selectedLetter.id].accuracy}%</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* History Timeline */}
                  <h4>Recent History</h4>
                  <div className="history-strip">
                    {data.letterStats[selectedLetter.id].history.slice(-20).map((h, i) => (
                      <div 
                        key={i} 
                        className={`history-dot ${h.isCorrect ? 'success' : 'fail'}`}
                        title={new Date(h.timestamp).toLocaleString()}
                      />
                    ))}
                  </div>

                  {/* Confusions */}
                  {data.letterStats[selectedLetter.id].failures > 0 && (
                    <div className="confusions-list">
                      <h4>Often Confused With:</h4>
                      {getTopConfusions(selectedLetter.id).length > 0 ? (
                        getTopConfusions(selectedLetter.id).map((conf, i) => (
                          <div key={i} className="confusion-item">
                            <span style={{ fontWeight: 'bold', width: '30px' }}>{conf.letter?.symbol || '?'}</span>
                            <div className="confusion-bar-container">
                              <div 
                                className="confusion-bar" 
                                style={{ width: `${conf.percent}%` }}
                              />
                            </div>
                            <span>{conf.count} times</span>
                          </div>
                        ))
                      ) : (
                        <p>No consistent confusion patterns yet.</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div className="stats-footer">
          {data.hasData && (
            <button className="clear-data-btn" onClick={handleClearData}>
              Start Fresh (Clear Data)
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default StatisticsPanel
