# Audio Setup Guide

This guide will help you set up the audio files for the Letter Sound Learning App.

## Required Audio Files

### 1. Phoneme Sounds (26 files needed)

Create the directory first:
```bash
mkdir -p public/sounds/phonemes
```

You need the following phoneme files in `public/sounds/phonemes/`:

**Easy Letters (Priority - Start with these):**
- `p.mp3` - "p" sound
- `b.mp3` - "b" sound  
- `t.mp3` - "t" sound
- `d.mp3` - "d" sound
- `m.mp3` - "m" sound
- `n.mp3` - "n" sound
- `s.mp3` - "s" sound
- `f.mp3` - "f" sound
- `a.mp3` - "a" sound (as in "cat")
- `e.mp3` - "e" sound (as in "bed")
- `i.mp3` - "i" sound (as in "sit")
- `o.mp3` - "o" sound (as in "hot")

**Medium Letters:**
- `k.mp3`, `g.mp3`, `l.mp3`, `r.mp3`, `w.mp3`, `h.mp3`, `v.mp3`, `z.mp3`, `u.mp3`

**Hard Letters:**
- `j.mp3`, `y.mp3`, `q.mp3`, `x.mp3`

### 2. Feedback Sounds

Also create these sound effects:
```bash
mkdir -p public/sounds
```

- `public/sounds/success.mp3` - Happy chime/ding for correct answers
- `public/sounds/celebration.mp3` - Longer celebratory music for victory screen

## How to Get Audio Files

### Method 1: Macquarie University (Most Authentic)

1. Visit: https://www.mq.edu.au/faculty-of-medicine-health-and-human-sciences/departments-and-schools/department-of-linguistics/our-research/phonetics-and-phonology/speech/phonetics-and-phonology/transcription/phonemic-broad-transcription-of-australian-english

2. For each letter sound:
   - Right-click on the audio player
   - Select "Inspect Element"
   - Find the `<audio>` tag and the `src` attribute
   - Download the audio file
   - Rename it to match the letter (e.g., `p.mp3`)
   - Save to `public/sounds/phonemes/`

### Method 2: Text-to-Speech (Quick Start)

Use a TTS service with Australian English voice:

**Online TTS Services:**
- [Google Cloud Text-to-Speech](https://cloud.google.com/text-to-speech) - Has Australian English
- [Amazon Polly](https://aws.amazon.com/polly/) - Has Australian English voice "Nicole"
- [Natural Reader](https://www.naturalreaders.com/online/) - Free online tool

**Process:**
1. Select Australian English voice
2. Type each letter sound (just the phoneme, not the letter name)
3. Generate and download as MP3
4. Rename file to letter.mp3

### Method 3: Free Sound Libraries

Search for phoneme sounds on:
- **Freesound.org**: https://freesound.org/
  - Search "letter p sound", "phoneme b", etc.
  - Filter by license: Creative Commons
  
- **ZapSplat**: https://www.zapsplat.com/
  - Educational sound effects section

- **BBC Sound Effects**: https://sound-effects.bbcrewind.co.uk/
  - Educational sounds

### Method 4: Record Your Own

If you or someone you know has an Australian accent:

**Using Audacity (Free):**
1. Download Audacity: https://www.audacityteam.org/
2. Click record button
3. Say the phoneme sound (just the sound, not the letter name)
4. File → Export → Export as MP3
5. Repeat for each letter

**Tips for recording:**
- Use a quiet room
- Speak clearly but naturally
- Keep recordings short (0.5-1 second)
- Use consistent volume

### Method 5: Commercial Audio Libraries

Purchase educational phonics sound packs:
- Teachers Pay Teachers
- Educational audio suppliers
- Phonics learning app sound packs

## Quick Test Setup (Temporary)

To test the app immediately without proper sounds:

1. Create a simple script to generate placeholder audio files:

```bash
# Create the directories
mkdir -p public/sounds/phonemes

# You can use any short audio file as a temporary placeholder
# Copy the same file for each letter just to test the app functionality
```

2. Or use online generators to create simple beep sounds temporarily

## Verification

After adding files, verify the structure:

```
public/
└── sounds/
    ├── phonemes/
    │   ├── p.mp3
    │   ├── b.mp3
    │   ├── t.mp3
    │   └── ... (all letter sounds)
    ├── success.mp3
    └── celebration.mp3
```

## Testing

1. Start the dev server: `npm run dev`
2. Open the app
3. Check browser console for any audio loading errors
4. Test each letter button to ensure sounds play

## Audio Format Recommendations

- **Format**: MP3 (best browser compatibility)
- **Sample Rate**: 44.1 kHz
- **Bit Rate**: 128 kbps (good quality, small size)
- **Duration**: 0.5-1.5 seconds per phoneme
- **Volume**: Normalized (consistent across all files)

## Troubleshooting

### Audio not playing?
- Check browser console for errors
- Ensure file paths match exactly (case-sensitive)
- Check file format is MP3
- Try playing file directly in browser

### Sounds too quiet/loud?
- Normalize audio files using Audacity
- Adjust volume in app settings
- Use audio editing software to match volumes

### Files too large?
- Compress MP3 files (128 kbps is sufficient)
- Trim silence from beginning/end
- Keep files under 100KB each

## Need Help?

If you're having trouble getting audio files:
1. Start with Method 2 (TTS) for quickest setup
2. Gradually replace with better quality recordings
3. Focus on "easy" letters first (12 files)
4. Add medium/hard letters as needed

The app will work with any audio files as long as they're named correctly!
