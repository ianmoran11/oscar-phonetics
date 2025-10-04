# Letter Sound Learning App - Design & Implementation Plan

## Overview
An educational app for a 3-year-old to learn letter-sound associations using Australian English phonemes, with engaging visual feedback (spinning fans) and a star-based reward system.

---

## 1. Core Features

### 1.1 Sound Playback
- Play letter sounds from Macquarie University's Australian English phoneme collection
- Focus on simple consonants and vowels suitable for a 3-year-old
- Audio files will need to be downloaded from: https://www.mq.edu.au/faculty-of-medicine-health-and-human-sciences/departments-and-schools/department-of-linguistics/our-research/phonetics-and-phonology/speech/phonetics-and-phonology/transcription/phonemic-broad-transcription-of-australian-english

### 1.2 Letter Selection
- Display configurable number of letter options (default: 3)
- One letter matches the played sound
- Large, colorful, child-friendly letters
- Touch/click interaction

### 1.3 Visual Feedback
- **Correct answer**: Letter grows large and spins for 5 seconds (fan animation)
- **Wrong answer**: Letter shakes (vibration animation)
- **Success sound**: Pleasant, encouraging audio
- **Error feedback**: Gentle shake (no harsh sounds to avoid discouragement)

### 1.4 Star Reward System
- Earn 1 star for correct answer
- Lose 1 star for incorrect answer (min: 0 stars)
- Goal: Accumulate 5 stars
- **Victory celebration**: Multiple spinning fans fill the screen with celebration sounds

### 1.5 Settings
- Adjustable number of letter choices (2-5 letters)
- Difficulty level (letter set selection)
- Volume controls
- Reset progress

---

## 2. Technical Architecture

### 2.1 Technology Stack
**Recommended: React + Vite**
- **Framework**: React (component-based, easy to maintain)
- **Build Tool**: Vite (fast development, modern)
- **Styling**: CSS Modules or Styled Components
- **Animations**: Framer Motion or React Spring
- **Audio**: Web Audio API / HTML5 Audio
- **State Management**: React Context or Zustand (lightweight)

### 2.2 Project Structure
```
letter-sound-app/
├── public/
│   ├── sounds/
│   │   ├── phonemes/        # Letter sound files
│   │   │   ├── p.mp3
│   │   │   ├── b.mp3
│   │   │   ├── t.mp3
│   │   │   └── ...
│   │   ├── success.mp3      # Correct answer sound
│   │   └── celebration.mp3  # 5-star victory sound
│   └── images/
│       └── fan.svg          # Fan icon for animations
├── src/
│   ├── components/
│   │   ├── Game/
│   │   │   ├── GameBoard.jsx      # Main game container
│   │   │   ├── LetterButton.jsx   # Individual letter button
│   │   │   ├── StarDisplay.jsx    # Star counter
│   │   │   └── VictoryScreen.jsx  # 5-star celebration
│   │   ├── Settings/
│   │   │   └── SettingsPanel.jsx  # Configuration
│   │   └── Animations/
│   │       ├── SpinningFan.jsx    # Spinning fan component
│   │       └── ShakeAnimation.jsx # Shake effect
│   ├── hooks/
│   │   ├── useAudio.js            # Audio playback hook
│   │   └── useGameState.js        # Game logic hook
│   ├── data/
│   │   └── letters.js             # Letter configurations
│   ├── utils/
│   │   └── gameLogic.js           # Letter selection logic
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

### 2.3 Data Model

```javascript
// Letter configuration
const letters = [
  {
    id: 'p',
    symbol: 'P',
    soundFile: '/sounds/phonemes/p.mp3',
    difficulty: 'easy',
    category: 'consonant'
  },
  // ... more letters
];

// Game state
const gameState = {
  stars: 0,
  currentLetter: null,
  letterChoices: [],
  settings: {
    numChoices: 3,
    difficulty: 'easy',
    soundEnabled: true,
    volume: 0.8
  }
};
```

---

## 3. Game Flow

### 3.1 Round Sequence
1. **Start Round**
   - Select random target letter
   - Generate decoy letters (ensure no duplicates)
   - Play letter sound automatically
   - Display letter buttons

2. **User Interaction**
   - User taps/clicks a letter
   - Check if correct

3. **Feedback**
   - **If Correct**:
     - Play success sound
     - Animate letter (grow + spin for 5 seconds)
     - Add 1 star
     - Check for victory (5 stars)
   
   - **If Incorrect**:
     - Shake letter animation
     - Subtract 1 star (minimum 0)
     - Replay sound after animation

4. **Next Round**
   - After animation completes, start new round
   - If victory achieved, show celebration screen

### 3.2 Victory Celebration
- Multiple spinning fan animations across screen
- Celebration sound/music
- Star burst effects
- "Play Again" button to reset

---

## 4. Animation Details

### 4.1 Spinning Fan (Correct Answer)
```css
/* Fan rotation animation */
@keyframes spinFan {
  from { 
    transform: scale(1) rotate(0deg);
  }
  to { 
    transform: scale(3) rotate(1800deg); /* 5 rotations */
  }
}

/* Duration: 5 seconds */
```

### 4.2 Shake Animation (Wrong Answer)
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

/* Duration: 0.5 seconds */
```

### 4.3 Victory Fans
- 5-10 fan elements positioned randomly
- All spinning continuously
- Varying sizes and speeds
- Confetti/particle effects (optional)

---

## 5. Letter Sets by Difficulty

### Easy (Starting Set)
Focus on clear, distinct sounds:
- Consonants: P, B, T, D, M, N, S, F
- Vowels: A (/æ/), E (/e/), I (/ɪ/), O (/ɔ/)

### Medium
Add more consonants:
- K, G, L, R, W, H, V, Z

### Advanced
Include challenging sounds:
- TH (/θ/, /ð/), SH (/ʃ/), CH (/tʃ/), J (/dʒ/)
- Long vowels and diphthongs

---

## 6. Accessibility & Child-Friendly Features

### 6.1 Visual Design
- **Large buttons**: Minimum 150px × 150px for easy tapping
- **High contrast**: Bright colors on clean background
- **Clear typography**: Child-friendly fonts (Comic Sans, Quicksand, Bubblegum Sans)
- **Big letters**: 72pt+ font size

### 6.2 Audio
- Clear, slow pronunciation
- Ability to replay sound (tap speaker icon)
- No time pressure - wait for child's response

### 6.3 Parent Controls
- Settings accessible via icon (not obvious to child)
- Progress tracking
- Adjustable difficulty

---

## 7. Implementation Phases

### Phase 1: Basic Setup (Day 1)
- [ ] Initialize React + Vite project
- [ ] Set up project structure
- [ ] Create basic components (GameBoard, LetterButton, StarDisplay)
- [ ] Implement simple UI layout

### Phase 2: Core Game Logic (Day 1-2)
- [ ] Implement letter selection logic
- [ ] Add audio playback
- [ ] Create game state management
- [ ] Basic click handling

### Phase 3: Animations (Day 2)
- [ ] Spinning fan animation for correct answers
- [ ] Shake animation for wrong answers
- [ ] Star counter animation
- [ ] Victory screen with multiple fans

### Phase 4: Sound Integration (Day 2-3)
- [ ] Download phoneme audio files
- [ ] Integrate phoneme sounds
- [ ] Add success/celebration sounds
- [ ] Test audio playback

### Phase 5: Settings & Polish (Day 3)
- [ ] Settings panel
- [ ] Adjustable number of choices
- [ ] Difficulty levels
- [ ] Mobile responsiveness
- [ ] Testing with target user

### Phase 6: Deployment (Day 3)
- [ ] Build optimization
- [ ] Deploy to Vercel/Netlify
- [ ] Test on mobile devices
- [ ] Final adjustments

---

## 8. Audio File Acquisition

### From Macquarie University
The phoneme audio files can be extracted from the website. Each phoneme has an embedded audio player.

**Process:**
1. Navigate to the phoneme table sections
2. Inspect the audio elements to find source URLs
3. Download .mp3 or .wav files
4. Rename consistently (e.g., `p.mp3`, `b.mp3`, `a.mp3`)
5. Store in `public/sounds/phonemes/`

**Alternative:**
- Record custom phonemes using text-to-speech
- Use commercial educational sound libraries
- Record with Australian English speaker

### Success Sounds
- Use royalty-free sound effects from:
  - Freesound.org
  - ZapSplat
  - Mixkit

---

## 9. Key User Experience Considerations

### For 3-Year-Old
- **Instant feedback**: No delays between action and response
- **Positive reinforcement**: Celebratory animations even for small wins
- **No text**: Pure visual and audio interface
- **Forgiving**: Can retry unlimited times
- **Engaging**: Fan animations tap into existing interest
- **Clear cause-effect**: Button press → immediate reaction

### For Parents
- **Easy to start**: One-tap to begin
- **Configurable**: Adjust difficulty as child progresses
- **Safe**: No ads, no external links, no in-app purchases
- **Offline capable**: PWA for airplane mode usage

---

## 10. Future Enhancements

- [ ] Progress tracking (which letters mastered)
- [ ] Multiple game modes (matching, spelling)
- [ ] Customizable rewards (different animations beyond fans)
- [ ] Multi-language support
- [ ] Parent dashboard with analytics
- [ ] Adaptive difficulty (automatic adjustment)
- [ ] More sound sets (animals, vehicles, etc.)

---

## 11. Testing Strategy

### With Target User (3-Year-Old)
- Observe interaction patterns
- Note confusion points
- Measure engagement time
- Adjust button sizes if needed
- Verify animations are compelling

### Technical Testing
- Cross-browser compatibility
- Mobile/tablet responsiveness
- Audio playback reliability
- Performance optimization
- Offline functionality

---

## Success Metrics

1. **Engagement**: Child wants to play multiple rounds
2. **Learning**: Improved letter-sound recognition over time
3. **Delight**: Visible excitement during fan animations
4. **Usability**: Can navigate without parent help
5. **Reliability**: No crashes or audio issues

---

## Notes
- Keep code simple and maintainable
- Comment complex logic for future updates
- Use semantic HTML for accessibility
- Test on actual mobile devices (tablets preferred for young children)
- Consider adding haptic feedback for tactile response
