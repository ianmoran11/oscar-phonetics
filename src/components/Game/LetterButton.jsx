import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { useAudio } from '../../hooks/useAudio'
import SpinningFan from '../Animations/SpinningFan'
import './LetterButton.css'

function LetterButton({ letter, isTarget, onComplete }) {
  const [showCorrect, setShowCorrect] = useState(false)
  const [showIncorrect, setShowIncorrect] = useState(false)
  const checkAnswer = useGameStore((state) => state.checkAnswer)
  const finishProcessing = useGameStore((state) => state.finishProcessing)
  const isProcessing = useGameStore((state) => state.isProcessing)
  const { play } = useAudio()

  const handleClick = () => {
    console.log('Button clicked:', letter.id, 'isProcessing:', isProcessing)
    
    if (isProcessing) {
      console.log('Click ignored - already processing')
      return
    }

    const isCorrect = checkAnswer(letter)
    
    // If checkAnswer returns null, it means we're already processing
    if (isCorrect === null) {
      console.log('checkAnswer returned null - already processing')
      return
    }

    if (isCorrect) {
      // Correct answer - show spinning fan
      console.log('Correct answer!')
      setShowCorrect(true)
      play('/sounds/success.wav')
      
      // Wait for animation to complete
      setTimeout(() => {
        setShowCorrect(false)
        finishProcessing()
        onComplete()
      }, 5000)
    } else {
      // Incorrect answer - shake
      console.log('Incorrect answer!')
      setShowIncorrect(true)
      
      setTimeout(() => {
        setShowIncorrect(false)
        finishProcessing()
        // Replay the target sound
        const currentLetter = useGameStore.getState().currentLetter
        if (currentLetter) {
          play(currentLetter.soundFile)
        }
      }, 600)
    }
  }

  return (
    <div className="letter-button-container">
      {showCorrect ? (
        <SpinningFan letter={letter.symbol} color={letter.color} />
      ) : (
        <motion.button
          className="letter-button"
          onClick={handleClick}
          disabled={isProcessing}
          animate={showIncorrect ? {
            x: [0, -10, 10, -10, 10, 0],
            rotate: [0, -5, 5, -5, 5, 0]
          } : {}}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="letter-symbol">{letter.symbol}</span>
        </motion.button>
      )}
    </div>
  )
}

export default LetterButton
