import React, { useState, useEffect, useMemo } from 'react';
import type { GameState, GameProps } from '../types/Game';

const ABCSequenceGame: React.FC<GameProps> = ({ onGameComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [gameState, setGameState] = useState<GameState>({ isComplete: false });
  const sequence = useMemo(() => ['A', 'B', 'C'], []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      
      if (key === sequence[currentStep]) {
        const nextStep = currentStep + 1;
        if (nextStep >= sequence.length) {
          setGameState({ 
            isComplete: true, 
            score: 100,
            message: 'Congratulations! You completed the ABC sequence!' 
          });
          // Call the completion callback
          onGameComplete?.(100);
        } else {
          setCurrentStep(nextStep);
        }
      } else {
        // Wrong key pressed, reset
        setCurrentStep(0);
        setGameState({ 
          isComplete: false,
          message: `Wrong key! Start over. Press ${sequence[0]} to begin.`
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStep, sequence, onGameComplete]);

  const resetGame = () => {
    setCurrentStep(0);
    setGameState({ isComplete: false });
  };

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
      <h2>ABC Sequence Game</h2>
      <p>Press the letters A, B, then C in order!</p>
      
      <div style={{ fontSize: '2rem', margin: '2rem 0' }}>
        {sequence.map((letter, index) => (
          <span
            key={letter}
            style={{
              margin: '0 0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: index < currentStep ? '#4CAF50' : 
                              index === currentStep ? '#FFC107' : '#f0f0f0',
              color: index <= currentStep ? 'white' : '#333',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {gameState.message && (
        <p style={{ 
          fontSize: '1.2rem', 
          color: gameState.isComplete ? '#4CAF50' : '#f44336',
          margin: '1rem 0'
        }}>
          {gameState.message}
        </p>
      )}

      {!gameState.isComplete && (
        <p style={{ fontSize: '1.1rem', color: '#666' }}>
          Next: Press <strong>{sequence[currentStep]}</strong>
        </p>
      )}

      {gameState.isComplete && (
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
          Play Again
        </button>
      )}
    </div>
  );
};

export default ABCSequenceGame;
