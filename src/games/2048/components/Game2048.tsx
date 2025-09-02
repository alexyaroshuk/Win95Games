'use client';

import React from 'react';
import { win95Theme } from '@/styles/theme';
import { use2048Game } from '../hooks/use2048Game';
import { GameBoard } from './GameBoard';
import { Game2048Stats } from './Game2048Stats';
import { GameOverDialog } from './GameOverDialog';

interface Game2048Props {
  targetScore?: number;
}

export function Game2048({ targetScore = 2048 }: Game2048Props) {
  const {
    grid,
    score,
    bestScore,
    gameState,
    animationState,
    move,
    resetGame,
    continueGame
  } = use2048Game();

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
          <GameBoard grid={grid} animationState={animationState} />
          <GameOverDialog 
            gameState={gameState}
            score={score}
            onRestart={resetGame}
            onContinue={continueGame}
          />
        </div>
        
        <Game2048Stats 
          score={score} 
          bestScore={bestScore}
          onReset={resetGame}
        />
      </div>
    </div>
  );
}