'use client';

import React from 'react';
import { Win95Button } from '../../common/components/ui/Win95Button';
import { GameState } from '../core/types';
import { win95Theme } from '@/styles/theme';

interface GameOverDialogProps {
  gameState: GameState;
  score: number;
  onRestart: () => void;
  onContinue: () => void;
}

export const GameOverDialog: React.FC<GameOverDialogProps> = ({ 
  gameState, 
  score, 
  onRestart, 
  onContinue 
}) => {
  const { colors, borders, spacing, fonts } = win95Theme;

  if (gameState === 'playing') return null;

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: colors.background,
      ...borders.raised,
      padding: spacing.lg,
      textAlign: 'center',
      zIndex: 10,
      minWidth: '200px'
    }}>
      <h2 style={{
        fontFamily: fonts.system,
        fontSize: '18px',
        marginBottom: spacing.md
      }}>
        {gameState === 'won' ? 'You Win!' : 'Game Over!'}
      </h2>
      <p style={{
        fontFamily: fonts.system,
        fontSize: '14px',
        marginBottom: spacing.md
      }}>
        {gameState === 'won' 
          ? `Congratulations! You reached 2048!`
          : `Final Score: ${score}`}
      </p>
      <div style={{
        display: 'flex',
        gap: spacing.sm,
        justifyContent: 'center'
      }}>
        <Win95Button onClick={onRestart} variant="primary">
          New Game
        </Win95Button>
        {gameState === 'won' && (
          <Win95Button onClick={onContinue} variant="default">
            Continue
          </Win95Button>
        )}
      </div>
    </div>
  );
};