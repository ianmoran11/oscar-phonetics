import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAudio } from '../../hooks/useAudio'
import { useGameStore } from '../../store/gameStore'
import './VictoryScreen.css'

function VictoryScreen({ onPlayAgain }) {
  const { play } = useAudio()
  const starsForVictory = useGameStore((state) => state.settings.starsForVictory)

  useEffect(() => {
    play('/sounds/celebration.mp3')
  }, [play])

  // Generate random positions for fans
  const fans = [...Array(12)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 80 + 10}%`,
    top: `${Math.random() * 80 + 10}%`,
    size: Math.random() * 80 + 120,
    delay: Math.random() * 0.5,
    duration: Math.random() * 1.5 + 1.5,
    numBlades: Math.random() > 0.5 ? 3 : 4,
  }))

  return (
    <motion.div
      className="victory-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background fans */}
      <div className="victory-fans">
        {fans.map((fan) => (
          <motion.div
            key={fan.id}
            className="victory-fan"
            style={{
              left: fan.left,
              top: fan.top,
              width: fan.size,
              height: fan.size,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: {
                duration: fan.duration,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: fan.duration / 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
              delay: fan.delay,
            }}
          >
            <div className="fan-blades-victory">
              {[...Array(fan.numBlades)].map((_, i) => (
                <div
                  key={i}
                  className="fan-blade-victory"
                  style={{ transform: `rotate(${i * (360 / fan.numBlades)}deg)` }}
                />
              ))}
            </div>
            <div className="fan-center-victory" />
          </motion.div>
        ))}
      </div>

      {/* Victory message */}
      <motion.div
        className="victory-content"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      >
        <motion.h1
          className="victory-title"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [-5, 5, -5, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          🎉 Amazing! 🎉
        </motion.h1>

        <div className="victory-stars">
          {[...Array(starsForVictory)].map((_, i) => (
            <motion.span
              key={i}
              className="victory-star"
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [0, 1.5, 1],
                rotate: [0, 360],
              }}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
              }}
            >
              ⭐
            </motion.span>
          ))}
        </div>

        <motion.p
          className="victory-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          You got {starsForVictory} stars!
          <br />
          Great job learning your letters!
        </motion.p>

        <motion.button
          className="play-again-button"
          onClick={onPlayAgain}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Play Again! 🎮
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default VictoryScreen
