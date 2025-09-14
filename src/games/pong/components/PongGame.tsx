'use client';

import React from 'react';
import { usePongEngine } from '../hooks/usePongEngine';
import { PongCanvas } from './PongCanvas';
import { PongStats } from './PongStats';
import { win95Theme } from '@/styles/theme';

interface PongGameProps {
  isActive?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const PongGame: React.FC<PongGameProps> = ({ 
  isActive = true,
  difficulty = 'medium' 
}) => {
  const {
    gameState,
    startGame,
    pauseGame,
    reset,
    setDifficulty
  } = usePongEngine(difficulty, isActive);

  React.useEffect(() => {
    setDifficulty(difficulty);
  }, [difficulty, setDifficulty]);

  return (
    <div style={{
      ...win95Theme.borders.raisedThick,
      backgroundColor: win95Theme.colors.background,
      padding: win95Theme.spacing.lg,
      width: 'fit-content',
      height: 'fit-content'
    }}>
      <div style={{
        display: 'flex',
        gap: win95Theme.spacing.lg,
        alignItems: 'flex-start'
      }}>
        <PongCanvas gameState={gameState} />
        
        <PongStats
          playerScore={gameState.playerScore}
          aiScore={gameState.aiScore}
          difficulty={gameState.difficulty}
          gameState={gameState.gameState}
          onStart={startGame}
          onPause={pauseGame}
          onReset={reset}
        />
      </div>
    </div>
  );
};

PongGame.displayName = 'PongGame';