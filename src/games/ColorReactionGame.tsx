import React, { useState, useEffect, useMemo } from 'react';
import type { GameState } from '../types/Game';

const ColorReactionGame: React.FC = () => {
  const [currentColor, setCurrentColor] = useState<string>('');
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>({ isComplete: false });
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);

  const colors = useMemo(() => [
    { name: 'Red', key: 'R', color: '#f44336' },
    { name: 'Green', key: 'G', color: '#4CAF50' },
    { name: 'Blue', key: 'B', color: '#2196F3' },
    { name: 'Yellow', key: 'Y', color: '#FFC107' }
  ], []);

  const getRandomColor = useMemo(() => {
    return () => colors[Math.floor(Math.random() * colors.length)];
  }, [colors]);

  useEffect(() => {
    let interval: number;
    if (gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
      setGameState({
        isComplete: true,
        score,
        message: `Time's up! You scored ${score} points!`
      });
    }
    return () => clearInterval(interval);
  }, [gameActive, timeLeft, score]);

  useEffect(() => {
    if (gameActive) {
      const newColor = getRandomColor();
      setCurrentColor(newColor.name);
    }
  }, [gameActive, score, getRandomColor]); // Change color when score changes

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!gameActive) return;
      
      const key = event.key.toUpperCase();
      const currentColorObj = colors.find(c => c.name === currentColor);
      
      if (currentColorObj && key === currentColorObj.key) {
        setScore(score + 1);
        // New color will be set by the useEffect above
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameActive, currentColor, colors, score]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setGameState({ isComplete: false });
    setCurrentColor(getRandomColor().name);
  };

  const currentColorObj = colors.find(c => c.name === currentColor);

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
      <h2>Color Reaction Game</h2>
      <p>Press the first letter of the color name as fast as you can!</p>
      
      {!gameActive && !gameState.isComplete && (
        <button 
          onClick={startGame}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            margin: '2rem 0'
          }}
        >
          Start Game
        </button>
      )}

      {gameActive && (
        <>
          <div style={{
            fontSize: '1.5rem',
            margin: '1rem 0',
            display: 'flex',
            justifyContent: 'space-between',
            width: '200px'
          }}>
            <span>Score: {score}</span>
            <span>Time: {timeLeft}s</span>
          </div>

          {currentColorObj && (
            <div style={{
              width: '200px',
              height: '200px',
              backgroundColor: currentColorObj.color,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '2rem 0',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              {currentColor}
            </div>
          )}

          <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
            Press <strong>{currentColorObj?.key}</strong> for {currentColor}
          </p>
        </>
      )}

      {gameState.isComplete && (
        <>
          <p style={{ 
            fontSize: '1.5rem', 
            color: '#4CAF50',
            margin: '2rem 0'
          }}>
            {gameState.message}
          </p>
          <button 
            onClick={startGame}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Play Again
          </button>
        </>
      )}

      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
        <p>Color keys: R = Red, G = Green, B = Blue, Y = Yellow</p>
      </div>
    </div>
  );
};

export default ColorReactionGame;
