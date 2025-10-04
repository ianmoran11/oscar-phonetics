import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import './StarDisplay.css'

function StarDisplay() {
  const stars = useGameStore((state) => state.stars)
  const maxStars = 5

  return (
    <div className="star-display">
      <div className="stars-container">
        {[...Array(maxStars)].map((_, index) => (
          <motion.div
            key={index}
            className={`star ${index < stars ? 'filled' : 'empty'}`}
            initial={{ scale: 0 }}
            animate={{ 
              scale: index < stars ? [1, 1.2, 1] : 1,
              rotate: index < stars ? [0, 10, -10, 0] : 0
            }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.1 
            }}
          >
            {index < stars ? '⭐' : '☆'}
          </motion.div>
        ))}
      </div>
      <div className="star-label">
        {stars} / {maxStars}
      </div>
    </div>
  )
}

export default StarDisplay
