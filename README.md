# 🔤 Letter Sound Learning App

An interactive educational app designed for 3-year-olds to learn letter-sound associations using Australian English phonemes. Features engaging spinning fan animations and a star-based reward system.

## ✨ Features

- 🎵 **Phonetic Sound Playback**: Plays Australian English letter sounds
- 🎯 **Interactive Letter Selection**: Choose the correct letter from multiple choices
- 🌀 **Spinning Fan Rewards**: Correct answers trigger 5-second spinning fan animations
- ⭐ **Star Progress System**: Earn stars for correct answers, lose them for mistakes
- 🎉 **Victory Celebration**: Multiple spinning fans when reaching 5 stars
- ⚙️ **Customizable Settings**: Adjust difficulty, number of choices, and volume
- 📱 **Mobile-Friendly**: Optimized for tablets and touch screens

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd letter-sound-app
```

2. Install dependencies:
```bash
npm install
```

3. **Important: Add Audio Files**
   
   You need to add the phoneme sound files to the `public/sounds/phonemes/` directory:
   
   - Create the directory structure:
     ```bash
     mkdir -p public/sounds/phonemes
     ```
   
   - Download phoneme audio files from [Macquarie University](https://www.mq.edu.au/faculty-of-medicine-health-and-human-sciences/departments-and-schools/department-of-linguistics/our-research/phonetics-and-phonology/speech/phonetics-and-phonology/transcription/phonemic-broad-transcription-of-australian-english)
   
   - Name the files according to the letter (e.g., `p.mp3`, `b.mp3`, `a.mp3`, etc.)
   
   - Also add success sounds:
     - `public/sounds/success.mp3` - played when correct answer
     - `public/sounds/celebration.mp3` - played at victory screen

   **Alternative**: You can use temporary placeholder sounds or text-to-speech generated audio files until you acquire the proper phoneme recordings.

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run preview
```

## 🎮 How to Play

1. **Listen**: The app automatically plays a letter sound
2. **Choose**: Tap the letter that matches the sound you heard
3. **Watch**: 
   - ✅ **Correct**: The letter spins like a fan for 5 seconds and you earn a star!
   - ❌ **Wrong**: The letter shakes and you lose a star
4. **Win**: Collect 5 stars to see the victory celebration with spinning fans everywhere!

## ⚙️ Settings

Access settings by tapping the gear icon (⚙️) in the top right:

- **Number of Letter Choices**: 2-5 letters to choose from (default: 3)
- **Difficulty Level**:
  - **Easy**: Basic letters (P, B, T, D, M, N, S, F + vowels)
  - **Medium**: More consonants added
  - **Hard**: All letters including challenging sounds
- **Sound Effects**: Toggle sound on/off
- **Volume**: Adjust sound volume (0-100%)
- **Reset Game**: Start over with 0 stars

## 📁 Project Structure

```
letter-sound-app/
├── public/
│   └── sounds/
│       ├── phonemes/          # Letter sound files (YOU NEED TO ADD THESE)
│       ├── success.mp3        # Success sound (YOU NEED TO ADD THIS)
│       └── celebration.mp3    # Victory sound (YOU NEED TO ADD THIS)
├── src/
│   ├── components/
│   │   ├── Game/
│   │   │   ├── GameBoard.jsx          # Main game container
│   │   │   ├── LetterButton.jsx       # Interactive letter buttons
│   │   │   ├── StarDisplay.jsx        # Star counter
│   │   │   ├── SoundButton.jsx        # Replay sound button
│   │   │   └── VictoryScreen.jsx      # Celebration screen
│   │   ├── Settings/
│   │   │   └── SettingsPanel.jsx      # Settings modal
│   │   └── Animations/
│   │       └── SpinningFan.jsx        # Fan animation component
│   ├── hooks/
│   │   └── useAudio.js                # Audio playback hook
│   ├── store/
│   │   └── gameStore.js               # Zustand state management
│   ├── data/
│   │   └── letters.js                 # Letter configurations
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## 🎨 Customization

### Adding More Letters

Edit `src/data/letters.js` to add or modify letters:

```javascript
{
  id: 'p',
  symbol: 'P',
  soundFile: '/sounds/phonemes/p.mp3',
  difficulty: 'easy',
  category: 'consonant',
  color: '#E74C3C'
}
```

### Changing Colors

Modify color variables in `src/index.css`:

```css
:root {
  --primary-blue: #4A90E2;
  --primary-green: #7ED321;
  /* ... more colors */
}
```

### Adjusting Animation Duration

In `src/components/Game/LetterButton.jsx`, change the timeout duration:

```javascript
setTimeout(() => {
  // Duration in milliseconds (currently 5000 = 5 seconds)
}, 5000)
```

## 📱 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

## 🔊 Audio File Resources

### Option 1: Macquarie University (Recommended)
- Visit the [phonemic transcription page](https://www.mq.edu.au/faculty-of-medicine-health-and-human-sciences/departments-and-schools/department-of-linguistics/our-research/phonetics-and-phonology/speech/phonetics-and-phonology/transcription/phonemic-broad-transcription-of-australian-english)
- Each phoneme has an audio player - inspect the page source to find the audio file URLs
- Download and rename files to match the letter IDs

### Option 2: Free Sound Libraries
- [Freesound.org](https://freesound.org/) - Search for phoneme sounds
- [ZapSplat](https://www.zapsplat.com/) - Free sound effects
- [Mixkit](https://mixkit.co/) - Free sound effects

### Option 3: Text-to-Speech
Use online TTS services to generate phoneme sounds with Australian English accent.

### Option 4: Record Your Own
Record clear pronunciations of each phoneme with an Australian English speaker.

## 🧒 Tips for Use with Young Children

1. **Use a tablet** - Larger screen, better touch experience
2. **Start with Easy mode** - Begin with 3 choices
3. **Encourage independence** - Let them tap buttons themselves
4. **Celebrate mistakes** - The shake animation is gentle and not punishing
5. **Short sessions** - 5-10 minutes of focused play
6. **Repeat sounds** - Use the sound button (🔊) to replay
7. **Parent guidance** - Sit nearby for first few sessions

## 🛠️ Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Framer Motion** - Smooth animations
- **Zustand** - Lightweight state management
- **Web Audio API** - Sound playback

## 📄 License

This project is created for educational purposes. Feel free to modify and use it for your own learning apps.

## 🤝 Contributing

This is a personal educational project, but suggestions are welcome! The app is designed to be simple and maintainable.

## 📞 Support

For questions or issues:
- Check the `DESIGN_PLAN.md` for detailed implementation notes
- Review the inline code comments for logic explanations

## 🎯 Roadmap

Future enhancements could include:
- [ ] Progress tracking (which letters mastered)
- [ ] Multiple game modes
- [ ] Customizable reward animations
- [ ] Parent dashboard with statistics
- [ ] Offline PWA support
- [ ] Multi-language support

---

**Made with ❤️ for little learners**
