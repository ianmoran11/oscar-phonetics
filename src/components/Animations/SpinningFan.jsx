import { motion } from 'framer-motion'
import './SpinningFan.css'

function SpinningFan({ letter, color }) {
  return (
    <motion.div
      className="spinning-fan"
      style={{ backgroundColor: color }}
      initial={{ scale: 1, rotate: 0 }}
      animate={{ 
        scale: [1, 3, 3, 3, 1],
        rotate: [0, 360, 720, 1080, 1440, 1800],
      }}
      transition={{ 
        duration: 5,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: "easeInOut"
      }}
    >
      <div className="fan-blades">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="fan-blade"
            style={{ 
              transform: `rotate(${i * 90}deg)`,
              backgroundColor: color
            }}
          />
        ))}
      </div>
      <div className="fan-center">
        <span className="fan-letter">{letter}</span>
      </div>
    </motion.div>
  )
}

export default SpinningFan
