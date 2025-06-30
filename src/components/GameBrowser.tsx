import React, { useState } from 'react';
import type { Game } from '../types/Game';
import { games } from '../games';

const GameBrowser: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [shuffledGames, setShuffledGames] = useState<Game[]>(games);

  const shuffleGames = () => {
    const shuffled = [...games].sort(() => Math.random() - 0.5);
    setShuffledGames(shuffled);
  };

  const goBackToMenu = () => {
    setSelectedGame(null);
  };

  if (selectedGame) {
    const GameComponent = selectedGame.component;
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
            ← Back to Games
          </button>
          <h1 style={{ margin: 0, color: '#333' }}>{selectedGame.title}</h1>
          <div></div> {/* Spacer for flex layout */}
        </header>
        <GameComponent />
      </div>
    );
  }

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
          Choose a game to play or shuffle for a random order!
        </p>
        
        <button
          onClick={shuffleGames}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          🔀 Shuffle Games
        </button>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        padding: '1rem 0'
      }}>
        {shuffledGames.map((game) => (
          <div
            key={game.id}
            onClick={() => setSelectedGame(game)}
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
