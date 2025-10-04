import { motion } from 'framer-motion'
import './SoundButton.css'

function SoundButton({ onClick }) {
  return (
    <motion.button
      className="sound-button"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Replay sound"
    >
      <div className="sound-waves">
        <motion.span 
          className="wave"
          animate={{ 
            scaleY: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            delay: 0 
          }}
        />
        <motion.span 
          className="wave"
          animate={{ 
            scaleY: [1, 1.8, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            delay: 0.2 
          }}
        />
        <motion.span 
          className="wave"
          animate={{ 
            scaleY: [1, 2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            delay: 0.4 
          }}
        />
      </div>
      <span className="sound-icon">🔊</span>
    </motion.button>
  )
}

export default SoundButton
