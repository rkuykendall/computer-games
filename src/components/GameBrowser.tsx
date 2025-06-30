import React, { useState } from 'react';
import type { Game } from '../types/Game';
import { games } from '../games';
import WinScreen from './WinScreen';

type GameFlowState = 'menu' | 'playing' | 'win-screen';

const GameBrowser: React.FC = () => {
  const [gameFlowState, setGameFlowState] = useState<GameFlowState>('menu');
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [gameSequence, setGameSequence] = useState<Game[]>(games);
  const [lastScore, setLastScore] = useState<number | undefined>();
  const [gamesCompleted, setGamesCompleted] = useState(0);

  const currentGame = gameSequence[currentGameIndex];
  const nextGame = gameSequence[(currentGameIndex + 1) % gameSequence.length];

  const shuffleAndStart = () => {
    const shuffled = [...games].sort(() => Math.random() - 0.5);
    setGameSequence(shuffled);
    setCurrentGameIndex(0);
    setGameFlowState('playing');
    setGamesCompleted(0);
  };

  const startGame = (game: Game) => {
    const gameIndex = games.findIndex(g => g.id === game.id);
    setCurrentGameIndex(gameIndex);
    setGameSequence(games);
    setGameFlowState('playing');
    setGamesCompleted(0);
  };

  const handleGameComplete = (score?: number) => {
    setLastScore(score);
    setGamesCompleted(prev => prev + 1);
    setGameFlowState('win-screen');
  };

  const goToNextGame = () => {
    const nextIndex = (currentGameIndex + 1) % gameSequence.length;
    setCurrentGameIndex(nextIndex);
    setGameFlowState('playing');
  };

  const goBackToMenu = () => {
    setGameFlowState('menu');
    setCurrentGameIndex(0);
    setGamesCompleted(0);
  };

  if (gameFlowState === 'win-screen') {
    return (
      <div>
        <header style={{
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={goBackToMenu}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            ← Back to Menu
          </button>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ margin: 0, color: '#333' }}>Game Complete!</h1>
            <p style={{ margin: '0.25rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
              Games completed: {gamesCompleted}
            </p>
          </div>
          <div></div>
        </header>
        <WinScreen
          title={currentGame.title}
          score={lastScore}
          onNextGame={goToNextGame}
          nextGameTitle={nextGame.title}
        />
      </div>
    );
  }

  if (gameFlowState === 'playing') {
    const GameComponent = currentGame.component;
    return (
      <div>
        <header style={{
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={goBackToMenu}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            ← Back to Menu
          </button>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ margin: 0, color: '#333' }}>{currentGame.title}</h1>
            <p style={{ margin: '0.25rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
              Games completed: {gamesCompleted} • Next: {nextGame.title}
            </p>
          </div>
          <div></div>
        </header>
        <GameComponent onGameComplete={handleGameComplete} />
      </div>
    );
  }

  // Menu state
  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ 
          color: '#333',
          fontSize: '2.5rem',
          marginBottom: '0.5rem'
        }}>
          🎮 Mini Games Browser
        </h1>
        <p style={{ 
          color: '#666',
          fontSize: '1.1rem',
          margin: '0.5rem 0 2rem'
        }}>
          Choose a game to play or shuffle for a random adventure!
        </p>
        
        <button
          onClick={shuffleAndStart}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            marginBottom: '2rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            fontWeight: 'bold'
          }}
        >
          🎲 Start Random Adventure
        </button>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        padding: '1rem 0'
      }}>
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => startGame(game)}
            style={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '1.5rem',
              cursor: 'pointer',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            <h3 style={{
              margin: '0 0 1rem 0',
              color: '#333',
              fontSize: '1.3rem'
            }}>
              {game.title}
            </h3>
            <p style={{
              margin: '0',
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.4'
            }}>
              {game.description}
            </p>
            <div style={{
              marginTop: '1rem',
              textAlign: 'right'
            }}>
              <span style={{
                color: '#2196F3',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                Click to Play →
              </span>
            </div>
          </div>
        ))}
      </div>

      <footer style={{
        textAlign: 'center',
        marginTop: '3rem',
        padding: '2rem 0',
        color: '#666',
        borderTop: '1px solid #eee'
      }}>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          Built with React + TypeScript + Vite • Ready for GitHub Pages
        </p>
      </footer>
    </div>
  );
};

export default GameBrowser;
