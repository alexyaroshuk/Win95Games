'use client';

import React, { useEffect } from 'react';
import { win95Theme } from '@/styles/theme';
import { useSnakeGame } from '../hooks/useSnakeGame';
import { SnakeBoard } from './SnakeBoard';
import { SnakeStats } from './SnakeStats';
import { GameControls } from './GameControls';
import { GameOverDialog } from './GameOverDialog';

interface SnakeGameProps {
  initialSpeed?: 'slow' | 'normal' | 'fast';
  isPaused?: boolean;
  isActive?: boolean;
}

export function SnakeGame({ initialSpeed = 'normal', isPaused = false, isActive = true }: SnakeGameProps) {
  const {
    snake,
    food,
    gameState,
    score,
    highScore,
    speed,
    startGame,
    pauseGame,
    handleDirectionClick,
    setGamePaused
  } = useSnakeGame(initialSpeed, isActive);

  useEffect(() => {
    if (setGamePaused) {
      setGamePaused(isPaused);
    }
  }, [isPaused, setGamePaused]);

  const { spacing, colors, borders } = win95Theme;

  return (
    <div style={{
      ...borders.raisedThick,
      backgroundColor: colors.background,
      padding: spacing.lg
    }}>
      <div style={{
        display: 'flex',
        gap: spacing.lg,
        alignItems: 'flex-start'
      }}>
        <div style={{ position: 'relative' }}>
          <SnakeBoard snake={snake} food={food} />
          {gameState === 'gameOver' && (
            <GameOverDialog score={score} onRestart={startGame} />
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
          <SnakeStats 
            score={score} 
            highScore={highScore} 
            speed={speed} 
          />
          
          <GameControls
            gameState={gameState}
            onStart={startGame}
            onPause={pauseGame}
            onDirectionClick={handleDirectionClick}
          />
        </div>
      </div>
    </div>
  );
}