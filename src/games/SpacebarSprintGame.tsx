import React, { useState, useEffect } from 'react';
import type { GameState, GameProps } from '../types/Game';

const SpacebarSprintGame: React.FC<GameProps> = ({ onGameComplete }) => {
  const [clickCount, setClickCount] = useState(0);
  const [gameState, setGameState] = useState<GameState>({ isComplete: false });
  const [startTime, setStartTime] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const targetClicks = 20;

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent page scrolling
        
        if (!gameStarted) {
          // Start the game on first spacebar press
          setGameStarted(true);
          setStartTime(Date.now());
          setClickCount(1);
        } else if (!gameState.isComplete) {
          const newCount = clickCount + 1;
          setClickCount(newCount);
          
          if (newCount >= targetClicks) {
            const endTime = Date.now();
            const duration = ((endTime - (startTime || endTime)) / 1000).toFixed(2);
            const clicksPerSecond = (targetClicks / parseFloat(duration)).toFixed(1);
            
            setGameState({
              isComplete: true,
              score: Math.round(parseFloat(clicksPerSecond) * 10), // Score based on clicks per second
              message: `Completed in ${duration} seconds! (${clicksPerSecond} clicks/sec)`
            });
            
            onGameComplete?.(Math.round(parseFloat(clicksPerSecond) * 10));
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [clickCount, gameState.isComplete, gameStarted, startTime, onGameComplete]);

  const resetGame = () => {
    setClickCount(0);
    setGameState({ isComplete: false });
    setStartTime(null);
    setGameStarted(false);
  };

  const progress = (clickCount / targetClicks) * 100;

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h2>Spacebar Sprint</h2>
      <p>Press the spacebar {targetClicks} times as fast as you can!</p>
      
      {!gameStarted && (
        <div style={{
          padding: '2rem',
          backgroundColor: '#E3F2FD',
          borderRadius: '12px',
          margin: '2rem 0',
          border: '2px solid #2196F3'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⌨️</div>
          <p style={{ fontSize: '1.2rem', margin: 0, color: '#1976D2' }}>
            Press <strong>SPACEBAR</strong> to start!
          </p>
        </div>
      )}

      {gameStarted && !gameState.isComplete && (
        <>
          <div style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#2196F3',
            margin: '2rem 0'
          }}>
            {clickCount} / {targetClicks}
          </div>

          <div style={{
            width: '300px',
            height: '20px',
            backgroundColor: '#f0f0f0',
            borderRadius: '10px',
            overflow: 'hidden',
            margin: '1rem 0'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#4CAF50',
              transition: 'width 0.1s ease'
            }} />
          </div>

          <p style={{ fontSize: '1.1rem', color: '#666' }}>
            Keep pressing <strong>SPACEBAR</strong>!
          </p>
        </>
      )}

      {gameState.isComplete && (
        <>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          
          <div style={{
            backgroundColor: '#E8F5E8',
            borderRadius: '12px',
            padding: '2rem',
            margin: '2rem 0',
            border: '2px solid #4CAF50'
          }}>
            <h3 style={{ color: '#2E7D32', margin: '0 0 1rem 0' }}>
              Sprint Complete!
            </h3>
            <div style={{ color: '#388E3C', fontSize: '1.2rem', marginBottom: '1rem' }}>
              {gameState.message}
            </div>
            {gameState.score && (
              <div style={{ color: '#1976D2', fontSize: '1.1rem', fontWeight: 'bold' }}>
                Score: {gameState.score}
              </div>
            )}
          </div>

          <button 
            onClick={resetGame}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Try Again
          </button>
        </>
      )}

      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
        <p>💡 Tip: Use your thumb or index finger for fastest results!</p>
      </div>
    </div>
  );
};

export default SpacebarSprintGame;
