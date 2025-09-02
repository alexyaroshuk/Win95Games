'use client';

import React from 'react';
import { useArkanoidEngine } from '../hooks/useArkanoidEngine';
import { ArkanoidCanvas } from './ArkanoidCanvas';
import { ArkanoidStats } from './ArkanoidStats';
import { win95Theme } from '@/styles/theme';

interface ArkanoidGameProps {
  isActive?: boolean;
}

export const ArkanoidGame: React.FC<ArkanoidGameProps> = ({ isActive = true }) => {
  const {
    gameState,
    movePaddleToPosition,
    launch,
    pause,
    reset,
    skipLevel,
  } = useArkanoidEngine(isActive);

  const handleCanvasClick = () => {
    if (gameState.gameStatus === 'lost') {
      reset();
    } else if (gameState.gameStatus === 'idle') {
      launch();
    }
  };

  return (
    <div style={{
      ...win95Theme.borders.raisedThick,
      backgroundColor: win95Theme.colors.background,
      padding: win95Theme.spacing.lg
    }}>
      <div style={{
        display: 'flex',
        gap: win95Theme.spacing.lg,
        alignItems: 'flex-start'
      }}>
        <ArkanoidCanvas 
          gameState={gameState}
          onMouseMove={movePaddleToPosition}
          onClick={handleCanvasClick}
        />
        
        <ArkanoidStats
          gameState={gameState}
          onPause={pause}
          onReset={reset}
          onSkipLevel={skipLevel}
        />
      </div>
    </div>
  );
};

ArkanoidGame.displayName = 'ArkanoidGame';