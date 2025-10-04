import { useEffect } from 'react'
import { useGameStore } from '../../store/gameStore'
import { useAudio } from '../../hooks/useAudio'
import LetterButton from './LetterButton'
import StarDisplay from './StarDisplay'
import SoundButton from './SoundButton'
import './GameBoard.css'

function GameBoard() {
  const { currentLetter, letterChoices, initGame, startNewRound } = useGameStore()
  const { play } = useAudio()

  // Initialize game on mount
  useEffect(() => {
    initGame()
  }, [initGame])

  // Play sound when new letter is selected
  useEffect(() => {
    if (currentLetter) {
      // Slight delay for better UX
      setTimeout(() => {
        play(currentLetter.soundFile)
      }, 300)
    }
  }, [currentLetter, play])

  const handleReplaySound = () => {
    if (currentLetter) {
      play(currentLetter.soundFile)
    }
  }

  if (!currentLetter || letterChoices.length === 0) {
    return <div className="game-board loading">Loading...</div>
  }

  return (
    <div className="game-board">
      <div className="game-header">
        <StarDisplay />
        <SoundButton onClick={handleReplaySound} />
      </div>

      <div className="game-instruction">
        <p>Tap the letter that makes this sound!</p>
      </div>

      <div className="letter-grid">
        {letterChoices.map((letter) => (
          <LetterButton
            key={letter.id}
            letter={letter}
            isTarget={letter.id === currentLetter.id}
            onComplete={startNewRound}
          />
        ))}
      </div>
    </div>
  )
}

export default GameBoard
