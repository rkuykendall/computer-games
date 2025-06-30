import React, { useState, useEffect } from 'react';

interface WinScreenProps {
  title: string;
  score?: number;
  message?: string;
  onNextGame: () => void;
  nextGameTitle: string;
}

const WinScreen: React.FC<WinScreenProps> = ({ 
  title, 
  score, 
  message, 
  onNextGame, 
  nextGameTitle 
}) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onNextGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onNextGame]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '3rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        maxWidth: '500px'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        
        <h1 style={{
          color: '#4CAF50',
          fontSize: '2.5rem',
          margin: '0 0 1rem 0'
        }}>
          Congratulations!
        </h1>
        
        <h2 style={{
          color: '#333',
          fontSize: '1.5rem',
          margin: '0 0 1rem 0'
        }}>
          You completed {title}!
        </h2>

        {score !== undefined && (
          <div style={{
            backgroundColor: '#E3F2FD',
            borderRadius: '12px',
            padding: '1rem',
            margin: '1rem 0',
            border: '2px solid #2196F3'
          }}>
            <div style={{ color: '#1976D2', fontSize: '1.2rem', fontWeight: 'bold' }}>
              Final Score: {score}
            </div>
          </div>
        )}

        {message && (
          <p style={{
            color: '#666',
            fontSize: '1.1rem',
            margin: '1rem 0'
          }}>
            {message}
          </p>
        )}

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#FFF3E0',
          borderRadius: '12px',
          border: '2px solid #FF9800'
        }}>
          <div style={{ color: '#E65100', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
            Next Up: <strong>{nextGameTitle}</strong>
          </div>
          <div style={{ color: '#F57C00', fontSize: '2rem', fontWeight: 'bold' }}>
            {countdown}
          </div>
          <div style={{ color: '#E65100', fontSize: '0.9rem' }}>
            Starting automatically...
          </div>
        </div>

        <button
          onClick={onNextGame}
          style={{
            marginTop: '1.5rem',
            padding: '0.75rem 2rem',
            fontSize: '1.1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          Continue Now →
        </button>
      </div>
    </div>
  );
};

export default WinScreen;
