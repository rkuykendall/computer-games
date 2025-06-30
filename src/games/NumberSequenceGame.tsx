import React, { useState, useEffect, useMemo } from 'react';
import type { GameState } from '../types/Game';

const NumberSequenceGame: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [gameState, setGameState] = useState<GameState>({ isComplete: false });
  const sequence = useMemo(() => ['1', '2', '3', '4', '5'], []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (key === sequence[currentStep]) {
        const nextStep = currentStep + 1;
        if (nextStep >= sequence.length) {
          setGameState({ 
            isComplete: true, 
            score: 100,
            message: 'Excellent! You completed the number sequence!' 
          });
        } else {
          setCurrentStep(nextStep);
        }
      } else {
        // Wrong key pressed, reset
        setCurrentStep(0);
        setGameState({ 
          isComplete: false,
          message: `Wrong number! Start over. Press ${sequence[0]} to begin.`
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStep, sequence]);

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
      <h2>Number Sequence Game</h2>
      <p>Press the numbers 1, 2, 3, 4, 5 in order!</p>
      
      <div style={{ fontSize: '2rem', margin: '2rem 0' }}>
        {sequence.map((number, index) => (
          <span
            key={number}
            style={{
              margin: '0 0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: index < currentStep ? '#4CAF50' : 
                              index === currentStep ? '#FF9800' : '#f0f0f0',
              color: index <= currentStep ? 'white' : '#333',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            {number}
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

export default NumberSequenceGame;
