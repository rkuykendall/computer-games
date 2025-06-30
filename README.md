# 🎮 Mini Games Browser

A collection of simple browser-based mini-games built with React, TypeScript, and Vite. Perfect for quick entertainment and deployed on GitHub Pages.

## 🎯 Featured Games

1. **ABC Sequence Game** - Press A, B, then C in order
2. **Number Sequence Game** - Press numbers 1-5 in sequence  
3. **Color Reaction Game** - Press the first letter of the displayed color (timed challenge)

## 🚀 Features

- **Game Browser Interface** - Easy navigation between games
- **Shuffle Function** - Randomize game order for variety
- **Responsive Design** - Works on desktop and mobile
- **Clean UI** - Modern, intuitive interface
- **TypeScript** - Type-safe code with excellent developer experience
- **GitHub Pages Ready** - Automated deployment workflow included

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - Automated CI/CD deployment

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd computer-games

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/computer-games/`

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 🌐 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions:

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Source: "GitHub Actions"

2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Automatic Deployment:**
   - The GitHub Action will automatically build and deploy
   - Your site will be available at: `https://yourusername.github.io/computer-games/`

### Manual Deployment (Alternative):

```bash
# Build and deploy manually using gh-pages
npm run build
npm run deploy
```

## 🎮 How to Play

### ABC Sequence Game
- Use your keyboard to press A, B, then C in order
- Green = completed, Yellow = current target, Gray = upcoming
- Wrong key resets the sequence

### Number Sequence Game  
- Press number keys 1, 2, 3, 4, 5 in order
- Same visual feedback system as ABC game
- Wrong number resets the sequence

### Color Reaction Game
- 30-second timed challenge
- Press the first letter of the displayed color:
  - **R** for Red
  - **G** for Green  
  - **B** for Blue
  - **Y** for Yellow
- Score points for correct responses
- Try to beat your high score!

## 🔧 Development

### Project Structure

```
src/
├── components/
│   └── GameBrowser.tsx    # Main game selection interface
├── games/
│   ├── ABCSequenceGame.tsx
│   ├── NumberSequenceGame.tsx
│   ├── ColorReactionGame.tsx
│   └── index.ts           # Games registry
├── types/
│   └── Game.ts            # TypeScript interfaces
├── App.tsx
└── main.tsx
```

### Adding New Games

1. Create a new game component in `src/games/`
2. Follow the `Game` interface from `src/types/Game.ts`
3. Register your game in `src/games/index.ts`
4. The game will automatically appear in the browser!

### Example Game Template

```tsx
import React, { useState } from 'react';
import type { GameState } from '../types/Game';

const YourGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({ isComplete: false });

  // Your game logic here

  return (
    <div style={{ /* your styles */ }}>
      {/* Your game UI here */}
    </div>
  );
};

export default YourGame;
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages (manual)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-game`)
3. Add your game following the existing patterns
4. Commit your changes (`git commit -m 'Add amazing new game'`)
5. Push to the branch (`git push origin feature/amazing-game`)
6. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Built with [Vite](https://vitejs.dev/) for blazing fast development
- Powered by [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Deployed on [GitHub Pages](https://pages.github.com/)

---

**Happy Gaming! 🎮**
